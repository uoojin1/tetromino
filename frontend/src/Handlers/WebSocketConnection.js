class WebSocketConnection {
  constructor(methods) {
    this.url = "ws://localhost:3000"
    this.ws = null
    this.isReady = false
    this.setConnectionIsOpen = methods.setConnectionIsOpen
    this.updateOnlineUsers = methods.updateOnlineUsers
    this.receiveChat = methods.receiveChat
    this.createdRoom = methods.createdRoom
    this.onlineUsers = []
    this.chat = []
    this.rooms = new Map()
    this._establishConnection()

    this.createRoom = this.createRoom.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.isConnected = this.isConnected.bind(this)
    this._establishConnection = this._establishConnection.bind(this)
  }

  _establishConnection() {
    this.ws = new WebSocket(this.url)
    this.ws.onopen = () => {
      this.setConnectionIsOpen(true)
    }
    this.ws.onmessage = (e) => {
      if (!e.data) return
      const [method, value] = JSON.parse(e.data).split(':')
      console.log('got msg', e.data)
      switch (method) {
        case 'new':
          this.setOnlineUsers(JSON.parse(value))
        case 'gotOnlineUsers':
          this.setOnlineUsers(JSON.parse(value))
          break
        case 'gotAvailableRooms':
          this.setRooms(new Map(JSON.parse(value)))
        case 'close':
          this.removeOnlineUser(JSON.parse(value))
          break
        case 'chatted':
          this.receivedChatFromServer(JSON.parse(value))
          break
        case 'createdRoom':
          this.setRooms(new Map(JSON.parse(value)))
        default:
          break
      }
    }
  }

  // mapToJson(map) {
  //   return JSON.stringify([...map]);
  // }
  // jsonToMap(jsonStr) {
  //   return new Map(JSON.parse(jsonStr));
  // }

  setRooms(rooms) {
    this.rooms = rooms
    this.createdRoom(this.rooms)
  }

  receivedChatFromServer(message) {
    this.chat = [...this.chat, message]
    this.receiveChat(this.chat)
  }

  setOnlineUsers(onlineUsers) {
    this.onlineUsers = onlineUsers
    this.updateOnlineUsers(onlineUsers)
  }

  getOnlineUsers() {
    this.onlineUsers = onlineUsers
    this.updateOnlineUsers(onlineUsers)
  }

  removeOnlineUser(userID) {
    const newUsersList = [...this.onlineUsers].filter(user => {
      return user !== userID
    })
    this.updateOnlineUsers(newUsersList)
  }

  isConnected() {
    return this.ws.readyState === WebSocket.OPEN
  }

  createRoom() {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(`createRoom:`))
    }
  }

  joinRoom(roomID) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(`joinRoom:${roomID}`))
    }
  }

  sendMessage(msg) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(`chat:${msg}`))
    }
  }

  getOnlineUsersList() {
    this.ws.send(JSON.stringify('getOnlineUsers'))
  }

  getAvailableRooms() {
    this.ws.send(JSON.stringify('getAvailableRooms'))
  }
}

export default WebSocketConnection
