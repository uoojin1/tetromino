import WebSocket from 'ws'

const Server = new WebSocket.Server({ port: 3000 })

console.log('listening on port 3000')

const connections = new Map()
let connectionID = 0

/**
 * TODO: 
 * 1. on new conection, update OnlinUsersList on all client
 * 2. on close connection, update OnlineUsersList on all client
 * 
 * 3. just like 'connections', we need to hold 'room'
 */

Server.on('connection', (ws) => {
  const uniqueID = connectionID++
  connections.set(uniqueID, ws)
  console.log('new online user', connections.keys())

  Server.clients.forEach((client) => {
    client.send("new:" + JSON.stringify(connections))
  })

  // received messsage
  ws.on('message', (data) => {
    console.log('message received', data)
    if (data === 'getOnlineUsers') {
      console.log('befre?', connections.keys())
      const onlineUsers = JSON.stringify([...connections.keys()])
      console.log('online users', onlineUsers)
      ws.send('getOnlineUsers:' + onlineUsers)
    }
    

    // Server.clients.forEach((client) => {
    //   // don't send me this back
    //   // if (client !== ws && client.readyState === WebSocket.OPEN) {
    //   //   console.log('send data to client!', data)
    //   //   client.send(data);
    //   // }
    //   if (client.readyState === WebSocket.OPEN) {
    //     console.log('send data to client!', data)
    //     client.send(data);
    //   }
    // })
  })

  // closing connection
  ws.on('close', () => {
    connections.delete(uniqueID)
    console.log('closing connection', connections)
  })
})