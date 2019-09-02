import React, { useRef, useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import GameStateContext from '../../Contexts/GameStateContext'
import GameHandler from '../../Handlers/GameHandler'

const GamePageWrapper = styled.div`
  height: 600;
  width: fit-content;
  margin: 5% auto;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-size: 30px;
  font-family: fantasy;
  width: fit-content;
  margin: 0 auto;
`

const GameBoardWrapper = styled.div`
  border: 1px solid grey;
  width: 240px;
  height: 400px;
`

const Button = styled.div`
  border: 1px solid grey;
  border-radius: 4px;
  display: flex;
  height: 35px;
  width: 100px;
  margin: 1rem auto;
`

const ButtonText = styled.div`
  width: fit-content;
  height: fit-content;
  margin: auto auto;
`

const GamePageContainer = () => {
  const gameboard = useRef(null);
  const [gameHandler, setGameHandler] = useState(null)
  const { gameState, setGameState } = useContext(GameStateContext)

  const handleButtonClick = (e) => {
    if (!gameHandler) return
    if (gameState === "ready") {
      gameHandler.start()
      setGameState("playing")
    }
    if (gameState === "playing") {
      gameHandler.finish()
      setGameState("ready")
    }
  }

  useEffect(() => {
    if (gameHandler === null && gameboard && gameboard.current !== null) {
      setGameHandler(new GameHandler(gameboard.current))
    }
  }, [gameboard.current])

  return (
    <GamePageWrapper>
      <Title>Tetromino</Title>
      <GameBoardWrapper>
        <canvas ref={gameboard} id="gameboard" width="240" height="400"></canvas>
      </GameBoardWrapper>
      <Button onClick={handleButtonClick}>
        <ButtonText>{gameState}</ButtonText>
      </Button>
    </GamePageWrapper>
  )
}

export default GamePageContainer
