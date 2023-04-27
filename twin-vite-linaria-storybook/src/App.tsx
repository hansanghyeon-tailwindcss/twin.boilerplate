import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { styled } from '@linaria/react';

const Title = styled.div`
  font-size: 24px;
`

const Button = styled.button<{ color: string }>`
  background: ${({ color }) => color};
  padding: 16px 24px;
  transition: 200ms;
  color: white;
  border-radius: 999px;
  display: inline-flex;
  flex-direction: column;

  & > ${Title} {
    font-weight: bold;
  }

  &:hover {
    color: ${({ color }) => color};
    background-color: white;
  }
`

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div>
          <Button color="red"  onClick={() => setCount((count) => count + 1)}>
            <div>BUTTON TEXT</div>
            <div>count is {count}</div>
            <Title>HELLO WORLD</Title>
          </Button>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
