import React, { createContext, useState, useEffect } from 'react'
import WebSocketConnection from '../Handlers/WebSocketConnection'

const ConnectionContext = createContext({
  connection: null,
  connectionIsOpen: false,
  onlineUsers: null
})

export const ConnectionProvider = ({ children }) => {
  const [connection, setConnection] = useState(null)
  const [connectionIsOpen, setConnectionIsOpen] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState([])
  
  const stateSetters = {
    setConnectionIsOpen,
    setOnlineUsers
  }

  useEffect(() => {
    if (!connection) {
      setConnection(new WebSocketConnection(stateSetters))
    }
    if (connectionIsOpen) {
      connection.getOnlineUsersList()
    }
  }, [connection, connectionIsOpen])

  console.log('o***nline users', onlineUsers)

  const value = {
    connection,
    connectionIsOpen,
    onlineUsers
  }

  return (
    <ConnectionContext.Provider value={value}>
      {children}
    </ConnectionContext.Provider>
  )
}
export const ConnectionConsumer = ConnectionContext.Consumer
export default ConnectionContext