import React from 'react'
import GNB from 'components/gnb'
import { ErrorBoundary } from 'react-error-boundary'
import './App.css'
import ErrorBoundaryFallback from 'generic/error-boundary-fallback'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onReset={() => {
        //Reset the state of your app so the error doesn't happen again
        console.log('Try again clicked');
      }}
    >
      <div tw="container">
        <GNB />
        <Outlet />
      </div>
    </ErrorBoundary>
  )
}

export default App