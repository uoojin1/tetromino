import React, { useState } from 'react'
import styled from 'styled-components'
import GameTitle from './GameTitle'
// import GameBoard from './GameBoard'
import BoardAndPreview from './BoardAndPreview'
// import PiecesPreview from './PiecesPreview'
import FlowControlButton from './FlowControlButton'

const GamePageWrapper = styled.div`
  height: 800px;
  width: fit-content;
  margin: 5% auto;
  display: flex;
  flex-direction: column;
`

const BoardAndPreviewWrapper = styled.div`
  display: flex;
  flex-direction: col;
  width: fit-content;
`

const GamePageContainer = () => {
  return (
    <GamePageWrapper>
      <GameTitle />
      <BoardAndPreview />
      <FlowControlButton />
    </GamePageWrapper>
  )
}

export default GamePageContainer
