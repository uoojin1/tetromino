import React from 'react'
import GamePage from './Components/GamePage'
import { GameStateProvider } from './Contexts/GameStateContext'

const App = () => {
  return (
    <GameStateProvider>
      <GamePage />
    </GameStateProvider>
  )
}

export default App
