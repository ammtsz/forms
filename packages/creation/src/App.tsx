import { Routes , Route, BrowserRouter,  } from 'react-router-dom'
import './App.css'
import FormCreationPage from "./pages/formCreation"

function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes >
                <Route path="/" element={<FormCreationPage />} />
            </Routes >
        </BrowserRouter>
    </div>
)
}
export default App
