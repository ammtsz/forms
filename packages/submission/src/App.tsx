import { Routes , Route, BrowserRouter,  } from 'react-router-dom'
import './App.css'
import FormSubmissionPage from "./pages/FormSubmission"

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
