import React, { useRef, useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import CanvasHandler from '../GamePage/BoardAndPreview/GameBoard/CanvasHandler'
import GameStateContext from '../../Contexts/GameStateContext'

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
  width: 350px;
  height: 500px;
`

const Button = styled.div`
  border: 1px solid grey;
  height: 45px;
  width: 150px;
  margin: 1rem;
`

const GamePageContainer = () => {
  const gameboard = useRef(null);
  const [canvasHandler, setCanvasHandler] = useState(null)
  const { gameState, setGameState } = useContext(GameStateContext)

  const handleButtonClick = () => {
    if (!canvasHandler) return
    if (gameState === "ready") {
      canvasHandler.gameStart()
      setGameState("playing")
    }
    if (gameState === "playing") {
      canvasHandler.gameFinish()
      setGameState("ready")
    }
  }

  useEffect(() => {
    if (gameboard && gameboard.current !== null) {
      setCanvasHandler(new CanvasHandler(gameboard.current))
    }
  }, [gameboard.current])

  return (
    <GamePageWrapper>
      <Title>Tetromino</Title>
      <GameBoardWrapper>
        <canvas ref={gameboard} id="gameboard" width="350px" height="500px"></canvas>
      </GameBoardWrapper>
      <Button onClick={handleButtonClick}>{gameState}</Button>
    </GamePageWrapper>
  )
}

export default GamePageContainer
