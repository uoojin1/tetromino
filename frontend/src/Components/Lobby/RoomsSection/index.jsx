import React, { useContext } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components'
import ConnectionContext from '../../../Contexts/ConnectionContext'

const RoomsSectionWrapper = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  margin: 2% 2%;
  height: 70%;
  /* overflow-y: scroll; */
`

const CreateRoomButton = styled.div`
  border: 1px solid grey;
  background-color: orange;
  height: 50px;
`

const Room = styled.div`
  border: 1px solid grey;
  border-radius: 5px;
  display: flex;
  height: 50px;
  margin: 3px;
  justify-content: center;
  align-items: center;
`

const RoomText = styled.div`
  height: fit-content;
  width: fit-content;
`

const RoomList = styled.div`
  overflow-y: scroll;
`

const Rooms = () => {
  const { connection, rooms } = useContext(ConnectionContext)

  console.log('rooms', rooms)
  const roomList = []

  rooms.forEach((value, key) => {
    roomList.push({ id: key, value })
  })

  console.log('roomList', roomList)

  if (!connection || !connection.isConnected()) {
    return <div>creating room is not available</div>
  }

  const handleCreateRoom = () => {
    connection.createRoom()
  }

  const handleEnterRoom = (roomID) => {
    console.log('handle enter room: roomID', roomID)
  }

  return (
    <RoomsSectionWrapper>
      <CreateRoomButton onClick={handleCreateRoom}>create room</CreateRoomButton>
      <RoomList>
        <Grid>
          <Row>
            {
              roomList.map((room) => {
                return (
                  <Col key={room.id} xs={6}>
                    <Room onClick={() => handleEnterRoom(room.id)}>
                      <RoomText>Room: {room.id}</RoomText>
                    </Room>
                  </Col>
                )
              })
            }
          </Row>
        </Grid>
      </RoomList>
    </RoomsSectionWrapper>
  )
}

export default Rooms
