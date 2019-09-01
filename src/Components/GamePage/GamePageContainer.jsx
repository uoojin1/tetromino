import React from 'react'

import GameTitle from './GameTitle'
import GameBoard from './GameBoard'
import PiecesPreview from './PiecesPreview'
import FlowControlButton from './FlowControlButton'

const GamePageContainer = () => {
  return (
    <div>
      <GameTitle />
      <GameBoard />
      <PiecesPreview />
      <FlowControlButton />
    </div>
  )
}

export default GamePageContainer
