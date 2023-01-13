const bcrypt = require('bcrypt');
const User = require('../models/userModel')
const { Op } = require("sequelize");
const Message = require('../models/messageModel');

module.exports.register = async (req, res, next) => {
    try {
        const {username, email, password} = req.body
        const passwordHash = await bcrypt.hash(password, 12)
        console.log(username)

        const userCheck = await User.findOne({ where: {username: username}})
        const emailCheck = await User.findOne({ where: {email: email}})
        if(userCheck) {
            return res.json({msg: 'User with such login already exists', status: false})
        }
        if(emailCheck) {
            return res.json({msg: 'User with such email already exists', status: false})
        }
        const user = await User.create({
            username,
            email,
            password: passwordHash
        })
        delete user.password
        return res.json({msg: 'Success', status: true, user})

    } catch (error) {
        return res.json({msg: 'Internal Server error', status: false})
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({ where: {username: username}})
        if(!user) {
            return res.json({msg: 'Incorrect username or password', status: false})
        } else {
            const isPasswordValid = await bcrypt.compare(password, user.dataValues.password)
            if(!isPasswordValid) {
                return res.json({msg: 'Incorrect username or password', status: false})
            } else {
                delete user.dataValues.password
                delete user.dataValues.longitude
                delete user.dataValues.latitude
                return res.json({msg: 'Success', status: true, user})
            }
        }

    } catch (error) {
        return res.json({msg: 'Internal Server error', status: false})
    }
}

module.exports.avatar = async (req, res, next) => { 
    try {
        const {userId} = req.params
        const avatarImage = req.body.image
        const user = await User.findOne({where: {
            id: userId
        }})

        user.update({
            isAvatarImageSet: true,
            avatarImage
        })

        return res.json({
            isSet: user.dataValues.isAvatarImageSet,
            image: user.dataValues.avatarImage
        })

    } catch (error) {
        return res.json({isSet: false})
    }
}

module.exports.getUserById = async (req, res, next) => { 
    try {
        // console.log(req.params.username)
        const candidates = await User.findAll({
            where: {
                username: {
                    [Op.like]: `%${req.params.username}%`,
                }
            }
        })
        // console.log(candidates)
        return res.json(candidates)
    } catch (error) {
        return res.json({msg: 'Error'})
    }
}

module.exports.getAllUsers = async (req, res, next) => { 
    try {
        const messages1 = await Message.findAll({where: {senderID: req.params.userId}})
        const messages2 = await Message.findAll({where: {acceptorID: req.params.userId}})
        const result1 = [...new Set(messages1.map(a => a.acceptorID))];
        const result2 = [...new Set(messages2.map(a => a.senderID))];
        let result = result1.concat(result2)
        let unigueResults = [...new Set(result)]
        console.log(unigueResults)

        const users = await User.findAll({
            where: {
                id: unigueResults
            },
            attributes: ['id', 'email', 'username', 'avatarImage']
        })
        return res.json(users)
    } catch (error) {
        return res.json({msg: 'Error'})
    }
}