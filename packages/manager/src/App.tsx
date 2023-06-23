import { lazy, Suspense } from 'react'
import { Router, Route, Routes, BrowserRouter } from 'react-router-dom'
// import { createBrowserHistory } from 'history'

const FormCreationPage = lazy(() => import("./components/CreationApp"))

// const history = createBrowserHistory()

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/creation" element={<FormCreationPage />} />
            <Route path="/" element={<div>MANAGER</div>} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  )
}

export default App