import React, { useContext } from 'react'
import styled from 'styled-components'
import ConnectionContext from '../../../Contexts/ConnectionContext'

const RoomsSectionWrapper = styled.div`
  border: 1px solid black;
  margin: 2% 2%;
  height: 70%;
`

const CreateRoomButton = styled.div`
  border: 1px solid grey;
  background-color: orange;
  height: 50px;
`

const Rooms = () => {
  const { connection } = useContext(ConnectionContext)

  if (!connection || !connection.isConnected()) {
    return <div>creating room is not available</div>
  }

  const handleCreateRoom = () => {
    connection.createRoom()
  }

  return (
    <RoomsSectionWrapper>
      <CreateRoomButton onClick={handleCreateRoom}>create room</CreateRoomButton>
      <div>room list</div>
    </RoomsSectionWrapper>
  )
}

export default Rooms
