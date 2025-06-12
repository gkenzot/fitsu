import React from 'react'
import { createRoot } from 'react-dom/client'

import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import theme from './styles/theme'
import GlobalStyles from './styles/GlobalStyles'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Elemento root não encontrado')
}

const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter basename="/fitsu">
        <GlobalStyles />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
