const express = require('express')

const userRouter = require('./router/userRouter.js')

const server = express();

server.use(express.json())
server.use("/users", userRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: "It's alive!"})
})

module.exports = server;