let io
function socketOperate (argIO) {
  io = argIO
  argIO.on('connection', handlerConnect)
}
function handlerConnect (client) {
  console.log('连接建立成功', '='.repeat(100))
  client.on('join-room', handlerJoinRoom)
  client.on('chat-msg', handlerChatMsg)
}
/**
 * 有人加入聊天室
 * @param {Object} data 消息
 */
function handlerJoinRoom (data) {
  console.log(data)
  io.emit('join-room', data)
}
/**
 * 有人发来消息
 * @param {Object} data 消息
 */
function handlerChatMsg (data) {
  console.log(data)
  const dt = new Date()
  data.date = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
  io.emit('chat-msg', data)
}
module.exports = socketOperate
