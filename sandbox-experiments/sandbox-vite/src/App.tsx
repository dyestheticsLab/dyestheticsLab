import { useState } from 'react'
import './App.css'
import { Button } from './components/Button.createdComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Button  />
    </div>
  )
}

export default App
