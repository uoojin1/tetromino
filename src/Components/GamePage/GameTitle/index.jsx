import React from 'react'
import styled from 'styled-components'

const Title = styled.div`
  font-size: 30px;
  font-family: fantasy;
  width: fit-content;
  margin: 0 auto;
`

const GameTitle = () => {
  return (
    <Title>Tetromino</Title>
  )
}

export default GameTitle
