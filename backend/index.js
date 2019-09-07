import WebSocket from 'ws'

const Server = new WebSocket.Server({ port: 3000 })

console.log('listening on port 3000')

// Session variables
const connections = new Map()
let connectionID = 0
const rooms = new Map()
let roomID = 0

const mapToJson = (map) => {
  return JSON.stringify([...map]);
}
const jsonToMap = (jsonStr) => {
  return new Map(JSON.parse(jsonStr));
}

const convertConnectionsToList = () => {
  return [...connections.keys()]
}

const broadcast = (type, message) => {
  Server.clients.forEach((client) => {
    client.send(JSON.stringify(`${type}:${message}`))
  })
}

const handleJoinRoom = (userID, roomID) => {
  if (!rooms || !rooms.has(roomID)) {
    console.log('joining is not a valid action')
  }
  const usersInThisRoom = rooms.get(roomID)
  usersInThisRoom.push(userID)
  rooms.set(roomID, usersInThisRoom)
}

const handleCreateRoom = (userID) => {
  rooms.set(roomID, [userID])
  roomID++
  broadcast('createdRoom', mapToJson(rooms))
}

Server.on('connection', (ws) => {
  const uniqueID = connectionID++
  connections.set(uniqueID, ws)

  // broadcast new connectino to every client
  broadcast('new', JSON.stringify(convertConnectionsToList()))

  // received messsage
  ws.on('message', (msg) => {
    const [req, body] = JSON.parse(msg).split(':')
    switch (req) {
      case 'getOnlineUsers':
        const list = convertConnectionsToList()
        ws.send(JSON.stringify(`gotOnlineUsers:${JSON.stringify(list)}`))
        break
      case 'getAvailableRooms':
        const availableRooms = mapToJson(rooms)
        ws.send(JSON.stringify(`gotAvailableRooms:${availableRooms}`))
        break
      case 'chat':
        const formattedMessage = `userID_[${uniqueID}]   -->   ${body}`
        broadcast('chatted', JSON.stringify(formattedMessage))
        break
      case 'createRoom':
        handleCreateRoom(uniqueID)
        break
      case 'joinRoom':
        const roomID = JSON.stringify(body)
        handleJoinRoom(uniqueID, roomID)
        break
      case 'exitRoom':
        break;
      default:
        break;
    }
  })

  // closing connection
  ws.on('close', () => {
    connections.delete(uniqueID)
    Server.clients.forEach(client => client.send(JSON.stringify(`close:${uniqueID}`)))
  })
})