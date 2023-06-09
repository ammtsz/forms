import { Routes , Route, BrowserRouter,  } from 'react-router-dom'
import './App.css'
import Form from "./components/form"

function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes >
                <Route path="/" element={<Form />} />
            </Routes >
        </BrowserRouter>
    </div>
)
}
export default App
