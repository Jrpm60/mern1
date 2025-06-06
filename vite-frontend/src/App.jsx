import { useState } from 'react'
import './App.css'
import RecetasFrontend from './components/RecetasFrontend'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RecetasFrontend/>
    </>
  )
}

export default App
