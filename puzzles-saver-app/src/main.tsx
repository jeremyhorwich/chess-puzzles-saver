import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { PuzzlePlayer } from './Components/PuzzlePlayer'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PuzzlePlayer fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" answer="e4" />
  </React.StrictMode>
)
