const { 
    register, 
    login, 
    avatar, 
    getAllUsers, 
    getUserById 
} = require('../controllers/userController')

const router = require('express').Router()

router.get('/allUsers/:userId', getAllUsers)
router.get('/user/:username', getUserById)
router.post('/register', register)
router.post('/login', login)
router.patch('/setAvatar/:userId', avatar)

module.exports = router