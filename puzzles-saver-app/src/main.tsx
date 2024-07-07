import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { PuzzlePlayer } from './components/PuzzlePlayer'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PuzzlePlayer fen="8/1P6/8/2K1k3/8/8/1p6/8 w - - 0 1" answer="b8=Q+"/>
  </React.StrictMode>
)
