(function (self, io, $) {
  'use strict'
  var socket, username
  var app = {
    init: function () {
      socket = io()
      this.bindEvents()
      this.bindSocketEvents()
      this.clearHtml()
    },
    clearHtml: function () {
      $('.c-list').innerHTML = ''
    },
    /**
     * 加入聊天室
     */
    joinRoom: function () {
      username = localStorage.getItem('username')
      socket.emit('join-room', { username: username })
    },
    /**
     * 注册所有 socket.io 相关事件
     */
    bindSocketEvents: function () {
      socket.on('connect', this.handlerConnect.bind(this))
      socket.on('join-room', this.handlerJoinRoom.bind(this))
      socket.on('chat-msg', this.handlerChatMsg.bind(this))
    },
    /**
     * 注册所有 dom 相关事件
     */
    bindEvents: function () {
      $('.c-chat form').onsubmit = this.handlerSub.bind(this)
    },
    /**
     * 发送聊天消息
     */
    handlerSub: function (e) {
      e.preventDefault()
      var oIpt = $('.c-input')
      if (!oIpt.value) return
      console.log(oIpt.value)
      socket.emit('chat-msg', { msg: oIpt.value, username: username })
      e.target.reset()
    },
    /**
     * 连接建立成功事件
     */
    handlerConnect: function () {
      this.joinRoom()
    },
    /**
     * 有人加入聊天室事件
     */
    handlerJoinRoom: function (data) {
      var oList = $('.c-list')
      var template = `
        <li class="c-item">
          <div class="c-join-info">【${data.username}】加入聊天室</div>
        </li>
    `
      oList.innerHTML = oList.innerHTML + template
      oList.scrollIntoView()
    },
    /**
     * 有人发来消息事件
     */
    handlerChatMsg: function (data) {
      console.log(data)
      var template = `
      <li class="c-item">
          <img class="c-avatar" src="./avatar.png" alt="">
          <div class="c-box">
            <div class="c-info">
              <div class="c-name">${data.username}</div>
              <div class="c-time">${data.date}</div>
            </div>
            <div class="c-content">${data.msg}</div>
          </div>
        </li>
      `
      var oList = $('.c-list')
      oList.innerHTML = oList.innerHTML + template
      oList.scrollIntoView()
    }
  }
  app.init()
})(window, window.io, window.document.querySelector.bind(document))
