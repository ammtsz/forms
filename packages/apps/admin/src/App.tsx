import { lazy, Suspense } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

const HomePage = lazy(() => import("./pages/Home"));
const FormCreationPage = lazy(() => import("./pages/Creation"));
const FormViewPage = lazy(() => import("./pages/View"));

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/create" element={<FormCreationPage />} />
            <Route path="/view" element={<FormViewPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
