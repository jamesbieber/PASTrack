const express = require('express')

const userRouter = require('./router/userRouter')
const testRouter = require('./router/testRouter')

const server = express();

server.use(express.json())
server.use("/users", userRouter);
server.use("/tests", testRouter)

server.get('/', (req, res) => {
    res.status(200).json({message: "It's alive!"})
})

module.exports = server;