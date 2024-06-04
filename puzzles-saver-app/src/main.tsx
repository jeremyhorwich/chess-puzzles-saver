import React from 'react'
import ReactDOM from 'react-dom/client'
import PuzzlePlayer from './Components/PuzzlePlayer'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <PuzzlePlayer fen="8/5k2/3p4/1p1Pp2p/pP2Pp1P/P4P1K/8/8 b - - 99 50" answer="Kg7"/>
  </React.StrictMode>
)
