import { BrowserRouter , Route, Routes } from 'react-router-dom'
import FormCreationPage from "./pages/formCreation"
import FormsManagementPage from "./pages/formsManagement"
import './App.css'
import Form from "../../submission/src/pages/form"

function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FormsManagementPage />} />
                <Route path="/create" element={<FormCreationPage/>} />
                <Route path="/form" element={<Form/>} />
            </Routes>
        </BrowserRouter>
    </div>
)
}
export default App
