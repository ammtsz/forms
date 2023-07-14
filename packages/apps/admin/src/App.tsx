import { lazy, Suspense } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

// import { createBrowserHistory } from 'history'
import FormManagementPage from "./pages/Home";

const FormCreationPage = lazy(() => import("./pages/Creation"));
const FormViewPage = lazy(() => import("./pages/View"));

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
