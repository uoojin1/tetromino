import React from 'react'
import Lobby from './Lobby'
import { ConnectionProvider } from '../../Contexts/ConnectionContext'

const LobbyContainer = () => {
  return (
    <ConnectionProvider>
      <Lobby />
    </ConnectionProvider>
  )
}

export default LobbyContainer
