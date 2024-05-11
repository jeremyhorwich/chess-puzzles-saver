import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Chessboard from './Components/Chessboard.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Chessboard />
  </React.StrictMode>,
)
