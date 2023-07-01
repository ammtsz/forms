import { BrowserRouter, Route, Routes } from "react-router-dom";

import FormsViewPage from "./pages/FormView";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormsViewPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
