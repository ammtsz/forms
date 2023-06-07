import { Routes , Route, BrowserRouter,  } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'

import './App.css'

const generateClassName = createGenerateClassName({
  productionPrefix: 'mkt'
})

function App() {
  return (
    <div>
        <StylesProvider generateClassName={generateClassName}>
            <BrowserRouter>
                <Routes >
                    <Route path="/" element={<div>Forms</div>} />
                </Routes >
            </BrowserRouter>
        </StylesProvider>
    </div>
)
}
export default App
