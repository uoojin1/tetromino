import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import GameBoard from './GameBoard'
import GameStateContext from '../../../../Contexts/GameStateContext'

const GameBoardWrapper = styled.div`
  border: 1px solid grey;
  width: 350px;
  height: 500px;
`

const GameBoardContainer = () => {
  const { gameState } = useContext(GameStateContext)

  return (
    <GameBoardWrapper>
      <canvas id="gameboard" width="350px" height="500px"></canvas>
    </GameBoardWrapper>
  )
}

export default GameBoardContainer
