import React, { createContext, useState, useEffect } from 'react'
import WebSocketConnection from '../Handlers/WebSocketConnection'

const ConnectionContext = createContext({
  connection: null,
  connectionIsOpen: false,
  onlineUsers: null,
  chat: [],
  rooms: null
})

export const ConnectionProvider = ({ children }) => {
  const [connection, setConnection] = useState(null)
  const [connectionIsOpen, setConnectionIsOpen] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [chat, setChat] = useState([])
  const [rooms, setRooms] = useState(new Map())

  const createdRoom = (rooms) => {
    setRooms(rooms)
  }

  const receiveChat = (messageList) => {
    setChat(messageList)
  }

  const updateOnlineUsers = (usersList) => {
    setOnlineUsers(usersList)
  }

  const methods = {
    setConnectionIsOpen,
    setOnlineUsers,
    updateOnlineUsers,
    receiveChat,
    createdRoom
  }

  useEffect(() => {
    if (!connection) {
      setConnection(new WebSocketConnection(methods))
    }
    if (connectionIsOpen) {
      connection.getOnlineUsersList()
      connection.getAvailableRooms()
    }
  }, [connection, connectionIsOpen])

  const value = {
    connection,
    connectionIsOpen,
    onlineUsers,
    chat,
    rooms
  }

  return (
    <ConnectionContext.Provider value={value}>
      {children}
    </ConnectionContext.Provider>
  )
}
export const ConnectionConsumer = ConnectionContext.Consumer
export default ConnectionContext