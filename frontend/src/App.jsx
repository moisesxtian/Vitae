import MainPage from "./pages/MainPage"
import Create from "./pages/Create"
import ManualBuild from "./pages/ManualBuild"
import Navbar from "./components/Navbar"
import Analyze from "./pages/Analyze"
import Jobs from "./pages/Jobs"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { FormProvider } from "./context/FormContext"
import { AiContextProvider } from "./context/AiContext"

function App() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <BrowserRouter>
        <AiContextProvider>
        <FormProvider>
        <Navbar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/create" element={<Create />}/>
            <Route path="/create/manual" element={<ManualBuild/>}/>
            <Route path="/analyze" element={<Analyze/>}/>
            <Route path="/jobs" element={<Jobs/>}/>
          </Routes>
        </div>
        </FormProvider>
        </AiContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
