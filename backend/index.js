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

const handleJoinRoom = (userID, JSONroomID) => {
  const roomID = Number(JSON.parse(JSONroomID))
  if (!rooms || !rooms.has(roomID)) {
    console.log('joining is not a valid action')
    return
  }
  const usersInThisRoom = rooms.get(roomID)
  usersInThisRoom.add(userID)
  rooms.set(roomID, usersInThisRoom)
  // broadcast to the people in that room

  console.log('\nROOM ID: ', roomID)
  console.log('all rooms', rooms)
  console.log('-- users in this room --')
  usersInThisRoom.forEach((roomMemberID) => {
    console.log('     ---- userID ----', userID)
    if (connections.has(roomMemberID)) {
      console.log('we found user', userID)
      if (roomMemberID === userID) {
        // send back ack
      } else {
        // send back 'someone joined'
      }
    }
  })
}

const handleCreateRoom = (userID) => {
  rooms.set(roomID, new Set([userID]))
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
        console.log('JOIN ROOM received!')
        console.log({req, body})
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