import React, { createContext, useState } from 'react'

const GameStateContext = createContext({
  gameState: "ready",
  setGameState: () => {}
})

export const GameStateProvider = ({ children }) => {
  const [gameState, setGameState] = useState("ready")
  const value = {
    gameState,
    setGameState
  }
  console.log('game state provider', value)
  console.log('children', children)
  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  )
}
export const GameStateConsumer = GameStateContext.Consumer
export default GameStateContext