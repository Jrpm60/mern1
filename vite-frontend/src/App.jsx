import { useState } from 'react'
import './App.css'
import Chat1 from './components/Chat1'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Chat1/>
    </>
  )
}

export default App
