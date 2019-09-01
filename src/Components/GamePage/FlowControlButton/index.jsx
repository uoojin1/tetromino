import React, { useContext } from 'react'
import styled from 'styled-components'
import GameStateContext from '../../../Contexts/GameStateContext'

const FlowControlButtonWrapper = styled.div`
  width: fit-content;
  margin: 0 auto;
`

const Button = styled.div`
  border: 1px solid grey;
  height: 45px;
  width: 150px;
  margin: 1rem;
  /* text-align: center; */
`

const FlowControlButton = () => {
  const { gameState, setGameState } = useContext(GameStateContext)

  const handleButtonClick = () => {
    if (gameState === "ready") setGameState("playing")
    if (gameState === "playing") setGameState("ready")
  }

  return (
    <FlowControlButtonWrapper>
      <Button onClick={handleButtonClick}>
        {gameState}
      </Button>
    </FlowControlButtonWrapper>
  )
}

export default FlowControlButton
