import { Routes , Route, BrowserRouter,  } from 'react-router-dom'
import './App.css'
import FormPage from "./pages/formSubmission"

function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes >
                <Route path="/" element={<FormPage />} />
            </Routes >
        </BrowserRouter>
    </div>
)
}
export default App
