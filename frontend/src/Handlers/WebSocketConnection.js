class WebSocketConnection {
  constructor(stateSetters) {
    this.url = "ws://localhost:3000"
    this.ws = null
    this.isReady = false
    this.setConnectionIsOpen = stateSetters.setConnectionIsOpen
    this.setOnlineUsers = stateSetters.setOnlineUsers
    this._establishConnection()

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
      const [method, value] = e.data.split(':')
      switch (method) {
        case 'new':
          console.log('new connection')
          this.setOnlineUsers(JSON.parse(value))
        case 'getOnlineUsers':
          console.log('set online users', JSON.parse(value))
          this.setOnlineUsers(JSON.parse(value))
          break
        default:
          break
      }
    }
  }

  isConnected() {
    return this.ws.readyState === WebSocket.OPEN
  }

  sendMessage(msg) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(msg)
    }
  }

  getOnlineUsersList() {
    this.ws.send('getOnlineUsers')
  }
}

export default WebSocketConnection
