import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import ConnectionContext from '../../Contexts/ConnectionContext'
import OnlineUsersList from '../../Components/Lobby/OnlineUsersList'
import Chat from './Chat'
import RoomsSection from './RoomsSection'

const LobbyWrapper = styled.div`
  width: fit-content;
  height: 700px;
  display: flex;
`

const RoomListAndChatWrapper = styled.div`
  border: 1px solid grey;
  border-radius: 5px;
  margin: 5px;
  width: 600px;
`

const RoomList = styled.div`
  border: 1px solid black;
  margin: 2% 2%;
  height: 70%;
`

// const Chat = styled.div`
//   border: 1px solid black;
//   margin: 2% 2%;
//   height: 160px;
// `

const OnlineUsersListWrapper = styled.div`
  border: 1px solid grey;
  border-radius: 5px;
  margin: 5px;
  width: 200px;
`

const Lobby = () => {
  const { connection, connectionIsOpen, onlineUsers, chat } = useContext(ConnectionContext)

  if (!connection || !connectionIsOpen || !onlineUsers) {
    return (
      <div>Connection is not ready</div>
    )
  }

  return (
    <LobbyWrapper>
      <RoomListAndChatWrapper>
        {/* <RoomList>ROOM LIST</RoomList> */}
        <RoomsSection />
        <Chat />
      </RoomListAndChatWrapper>
      <OnlineUsersListWrapper>
        <OnlineUsersList onlineUsers={onlineUsers} />
      </OnlineUsersListWrapper>
    </LobbyWrapper>
  )
}

export default Lobby
