import React, { useRef, useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import GameBoard from './GameBoard'
import GameStateContext from '../../../../Contexts/GameStateContext'
import CanvasContext from '../../../../Contexts/CanvasContext'
import CanvasHandler from './CanvasHandler'

const GameBoardWrapper = styled.div`
  border: 1px solid grey;
  width: 240px;
  height: 400px;
`

const GameBoardContainer = () => {
  const { gameState } = useContext(GameStateContext)
  const { canvasHandler, setCanvasHandler } = useContext(CanvasContext)
  const gameboard = useRef(null);

  useEffect(() => {
    console.log('gameboard changed!', gameboard)
    if (gameboard && gameboard.current) {
      const context = gameboard.current.getContext("2d")
      setCanvasHandler(new CanvasHandler(context))
    }
  }, [gameboard])

  if (!canvasHandler) return <div>canvas not ready yet</div>
  console.log('check this out *** ', canvasHandler)

  return (
    <GameBoardWrapper>
      <canvas ref={gameboard} id="gameboard" width="240" height="400"></canvas>
    </GameBoardWrapper>
  )
}

export default GameBoardContainer
