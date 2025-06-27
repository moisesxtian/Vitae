import MainPage from "./pages/MainPage"
import Create from "./pages/Create"
import Navbar from "./components/Navbar"
import {BrowserRouter, Route, Routes} from "react-router-dom"

function App() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <BrowserRouter>
        <Navbar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/create" element={<Create />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
