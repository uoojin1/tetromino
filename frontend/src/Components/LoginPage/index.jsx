import React from 'react'
import styled from 'styled-components'

const GoToLobbyButton = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  height: fit-content;
  width: fit-content;
  padding: 10px;
  margin: 10px;
`

const GoToSoloGameButton = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  height: fit-content;
  width: fit-content;
  padding: 10px;
  margin: 10px;
`

const ButtonWrappers = styled.div`
  display: flex;
`

const GameTitleWrapper = styled.div`
  display: flex;
  height: 300px;
  width: 300px;
`
const GameTitle = styled.div`
  height: fit-content;
  width: fit-content;
  margin: auto auto;
`

const LoginPageWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const LoginPage = ({ history }) => {
  const handleGoToLobby = () => {
    history.push('/lobby')
  }
  const handleGoToSoloGame = () => {
    history.push('/game')
  }
  return (
    <LoginPageWrapper>
      <GameTitleWrapper>
        <GameTitle>
          테트로미노 v1
        </GameTitle>
      </GameTitleWrapper>
      <ButtonWrappers>
        <GoToLobbyButton onClick={handleGoToLobby}>go to lobby</GoToLobbyButton>
        <GoToSoloGameButton onClick={handleGoToSoloGame}>go to solo game</GoToSoloGameButton>
      </ButtonWrappers>
    </LoginPageWrapper>
  )
}

export default LoginPage
