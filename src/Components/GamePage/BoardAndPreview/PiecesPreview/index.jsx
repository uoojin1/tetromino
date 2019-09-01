import React from 'react'
import styled from 'styled-components'

const PiecesPreviewWrapper = styled.div`
  border: 1px solid grey;
  height: 400px;
  margin: 0 1rem;
  width: 100px;
`

const GameTitle = () => {
  
  return (
    <PiecesPreviewWrapper>Pieces Preview</PiecesPreviewWrapper>
  )
}

export default GameTitle
