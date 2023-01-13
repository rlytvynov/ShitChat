const Message = require("../models/messageModel")

module.exports.addMessage = async (req, res) => {
    try {
        const {from, to, message} = req.body
        //console.log(from, to, message)
        const data = await Message.create({
            senderID: from,
            acceptorID: to,
            text: message
        })
        if(data) {
            return res.json({msg: 'Message sended succesfully', status: true})
        } else {
            return res.json({msg: 'Failed to send message', status: false})
        }
    } catch (error) {
        return res.json({msg: 'Internal Server error', status: false})
    }
}
module.exports.getAllMessages = async (req, res) => {
    try {
        const {from, to} = req.body

        const messagesFromMe = await Message.findAll(
            {
                where: {
                    senderID: from,
                    acceptorID: to
                }
            }
        )
        const messagesToMe = await Message.findAll(
            {
                where: {
                    senderID: to,
                    acceptorID: from
                }
            }
        )

        const messages = messagesFromMe.concat(messagesToMe)

        console.log(messages.sort((a, b) => new Date(a.dataValues.updatedAt) - new Date(b.dataValues.updatedAt)))
        
        if(messages) {
            return res.json({msg: 'Messages was succesfully gotten', data: messages})
        } else {
            return res.json({msg: 'Failed to get messages', data: []})
        }
    } catch (error) {
        return res.json({msg: 'Internal Server error', status: false})
    }
}