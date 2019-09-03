import React from 'react'
import styled from 'styled-components'

const UserListWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 5% 0;
`

const UserWrapper = styled.div`
  border: 1px solid grey;
  display: flex;
  width: 90%;
  height: 5%;
  margin: 2% auto;
`

const UserInfo = styled.div`
  width: fit-content;
  height: fit-content;
  margin: auto auto;
`

const OnlineUsersList = ({ onlineUsers }) => {
  console.log('online users list !@!@#!@# ', onlineUsers)
  return (
    <UserListWrapper>
      {
        onlineUsers.map((user) => {
          return (
            <UserWrapper key={user}>
              <UserInfo>USER ID: {user}</UserInfo>
            </UserWrapper>
          )
        })
      }
    </UserListWrapper>
  )
}

export default OnlineUsersList