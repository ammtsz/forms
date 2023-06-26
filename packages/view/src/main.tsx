import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'

import {
  createMemoryHistory,
  createBrowserHistory,
  InitialEntry,
  MemoryHistory,
  BrowserHistory,
  Listener
} from 'history'


// TODO: simplify this file if mfe doesnt work
interface MountProps {
  onNavigate?: Listener
  defaultHistory?: MemoryHistory | BrowserHistory
  initialPath?: InitialEntry
}

const mount = (el: Element, { onNavigate, defaultHistory, initialPath }: MountProps) => {
    const history = defaultHistory
      || (initialPath && createMemoryHistory({initialEntries: [initialPath]}))
      || createBrowserHistory()

    if (onNavigate) {
        history.listen(onNavigate)
    }

    ReactDOM.createRoot(el).render(
      <React.StrictMode>
        <ChakraProvider>
          <App/>
        </ChakraProvider>
      </React.StrictMode>,
    )

    return {
        onParentNavigate: ({ pathname: nextPathname }: {pathname: string}) => {
            const { pathname } = history.location

            if( pathname !== nextPathname) {
                history.push(nextPathname)
            }
        }
    }
}

if (process.env.NODE_ENV === "development") {
    const devRoot = document.querySelector("#_creation-root")
    
    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() })
    } 
}

export { mount }