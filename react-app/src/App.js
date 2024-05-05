function App() {
  return (
    ShowPGN("Hello")
  );
}

function ShowPGN({ pgn }) {
    return (
        <p>{pgn}</p>
    )
}

export default App;
