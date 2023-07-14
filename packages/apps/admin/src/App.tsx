import { lazy, Suspense } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

// import { createBrowserHistory } from 'history'
import FormManagementPage from "./pages/formsManagement";

const FormCreationPage = lazy(() => import("./pages/FormCreation"));
const FormViewPage = lazy(() => import("./pages/FormView"));

// const history = createBrowserHistory()

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/create" element={<FormCreationPage />} />
            <Route path="/view" element={<FormViewPage />} />
            <Route path="/" element={<FormManagementPage />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
