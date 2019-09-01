import React from 'react'
import styled from 'styled-components'
import GameBoard from './GameBoard'
import PiecesPreview from './PiecesPreview'

const BoardAndPreviewWrapper = styled.div`
  display: flex;
  flex-direction: col;
  width: fit-content;
`

const BoardAndPreview = () => {
  return (
    <BoardAndPreviewWrapper>
      <GameBoard />
      <PiecesPreview />
    </BoardAndPreviewWrapper>
  )
}

export default BoardAndPreview
