import { BrowserRouter , Route, Routes } from 'react-router-dom'
import FormCreationPage from "./pages/formCreation"
import './App.css'

function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FormCreationPage/>} />
            </Routes>
        </BrowserRouter>
    </div>
)
}
export default App
