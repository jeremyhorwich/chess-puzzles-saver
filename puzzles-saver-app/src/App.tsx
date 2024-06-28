import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Landing } from "./pages/Landing"
import { Sets } from "./pages/Sets"
import { PlayPuzzles } from "./pages/PlayPuzzles"
import { Results } from "./pages/Results"


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />}/>
                <Route path="/sets" element={<Sets />}/>
                <Route path="/playPuzzles" element={<PlayPuzzles />}/>
                <Route path="/results" element={<Results />}/>
            </Routes>
        </Router>
    )
}

export default App
