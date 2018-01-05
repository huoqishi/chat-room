const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const socketOperate = require('./socket.io.js')
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static('./public'))
app.use(express.static('./node_modules'))
socketOperate(io)
server.listen(3000, '127.0.0.1', err => {
  if (err) {
    return console.log(err)
  }
  console.log('启动成功: http://127.0.0.1:3000/index.html')
})
