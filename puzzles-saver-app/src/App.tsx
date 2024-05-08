import './styles.css'

function App() {
  return (
    <div className="puzzleViewer">
      <TopBar/>
      <Puzzle/>
    </div>
  )
}

function TopBar() {
  return (
    <div className="topbar"></div>
  )
}

function Puzzle() {
  return (
    <div className="puzzle">
      <Board/>
      <PuzzleMeta/>
    </div>
  )
}

function Board() {
  return (
    <div className="board"></div>
  )
}


function PuzzleMeta() {
  const game1 = "1. e4 c5 2. c3 Nf6 3. e5 Nd5 4. Nf3 d6 5. Bb5+ Bd7 6. Bc4 Bc6 7. O-O e6 8. d4"
  return (
    <div className="puzzleMeta">
      <Notation pgn={game1}/>
      <OtherOptions/>
    </div>
  )
}

type notation = {
  pgn: String
}

function Notation(props: notation) {
  return (
    <div className="notation">{props.pgn}</div>
  )
}

function OtherOptions() {
  return (
    <div className="otherOptions"></div>
  )
}

export default App
