import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.tsx'
import PuzzlePlayer from './components/PuzzlePlayer'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <PuzzlePlayer fen="" answer=""/>
  </React.StrictMode>,
)
