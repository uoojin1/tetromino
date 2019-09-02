import React, { createContext, useState } from 'react'

const CanvasContext = createContext({
  canvasHandler: null,
  setCanvasHandler: () => {}
})

export const CanvasContextProvider = ({ children }) => {
  console.log('canvas context provider')
  const [canvasHandler, setCanvasHandler] = useState(null)
  const value = {
    canvasHandler,
    setCanvasHandler
  }
  console.log('canvas state provider', value)
  return (
    <CanvasContext.Provider value={value}>
      {children}
    </CanvasContext.Provider>
  )
}
export const CanvasContextConsumer = CanvasContext.Consumer
export default CanvasContext