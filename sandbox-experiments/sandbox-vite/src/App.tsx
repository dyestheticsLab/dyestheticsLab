import { useState } from 'react'
import './App.css'
import Button from './components/Button2.created.Compoent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Button appearance='primary' >Hello</Button>
    </div>
  )
}

export default App
