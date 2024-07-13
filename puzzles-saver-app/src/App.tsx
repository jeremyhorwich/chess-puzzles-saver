import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import { Sets } from "./pages/Sets"
import { PlayPuzzles } from "./pages/PlayPuzzles"
import { Error } from "./pages/Error"


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />}/>
                <Route path="/sets" element={<Sets />}/>
                <Route path="/playpuzzles" element={<PlayPuzzles />}/>
                <Route path="/error" element={<Error />}/>
            </Routes>
        </Router>
    )
}

export default App
