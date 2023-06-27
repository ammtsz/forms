import { Routes , Route, BrowserRouter } from 'react-router-dom'
import FormSubmissionPage from "./pages/FormSubmission"

import './App.css'

function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes >
                <Route path="/" element={<FormSubmissionPage />} />
            </Routes >
        </BrowserRouter>
    </div>
)
}
export default App
