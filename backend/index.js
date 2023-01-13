require('dotenv').config()
const express = require('express')
const cors = require('cors')
const socket = require("socket.io")
const {checkConnection} = require('./database/checkConnection')

const userRoutes = require('./routes/userRouter')
const messageRoutes = require('./routes/messageRouter')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', userRoutes)
app.use('/api/messages', messageRoutes)

checkConnection()

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started On Port ${process.env.PORT}`)
})

const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
})

global.onlineUsers = new Map()

io.on("connection", socket => {
    global.chatSocket = socket
    socket.on("add-user", userId => {
        onlineUsers.set(userId, socket.id)
    })
    socket.on("send-msg", data => {
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data)
        }
    })
})