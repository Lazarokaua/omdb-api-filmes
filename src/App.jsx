import { BrowserRouter as Rotas, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import { MovieDetails } from "./pages/MovieDetails"
import { Favorites } from "./pages/Favorites"

function App() {
    return (
        <>
            <Rotas>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/details/:id" element={<MovieDetails />}/>
                    <Route path="/favorites" element={<Favorites />}/>
                </Routes>
            </Rotas>
        </>
    )
}

export default App
