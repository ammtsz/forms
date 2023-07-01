import { lazy, Suspense } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

// import { createBrowserHistory } from 'history'
import FormManagementPage from "./pages/formsManagement";

const FormCreationPage = lazy(() => import("./components/Apps/CreationApp"));
const FormSubmissionPage = lazy(
  () => import("./components/Apps/SubmissionApp")
);
const FormViewPage = lazy(() => import("./components/Apps/ViewApp"));

// const history = createBrowserHistory()

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/create" element={<FormCreationPage />} />
            <Route path="/form" element={<FormSubmissionPage />} />
            <Route path="/view" element={<FormViewPage />} />
            <Route path="/" element={<FormManagementPage />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
