import { useState } from 'react'
import './App.css'
import Polling from './components/Polling'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Polling />
    </>
  )
}

export default App
