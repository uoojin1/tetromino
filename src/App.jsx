import React from 'react'
import GamePage from './Components/GamePage'
import { GameStateProvider } from './Contexts/GameStateContext'
import { CanvasContextProvider } from './Contexts/CanvasContext'

const App = () => {
  return (
    <GameStateProvider>
      <CanvasContextProvider>
        <GamePage />
      </CanvasContextProvider>
    </GameStateProvider>
  )
}

export default App
