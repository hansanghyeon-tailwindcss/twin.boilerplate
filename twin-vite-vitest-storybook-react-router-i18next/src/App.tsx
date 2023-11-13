import GNB from 'components/gnb'
import React from 'react'
import './App.css'

function App({children}: {children: React.ReactNode}) {
  return (
    <>
      <GNB />
      {children}
    </>
  )
}

export default App