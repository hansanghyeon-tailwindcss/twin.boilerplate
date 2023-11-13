import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppI18nextProvider } from 'generic/i18n-provider'
import { LangRouter } from 'routing/lang-router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppI18nextProvider>
        <LangRouter />
      </AppI18nextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
