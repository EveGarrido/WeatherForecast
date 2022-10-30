import './App.css'
import Weather from './components/Weather'
import background from "./assets/fondo1.jpg"
import { useEffect, useState } from 'react'
import RingLoader from "react-spinners/RingLoader"

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
        setLoading(false);
      }, 5000);
  }, [])

  return (
    <div className="App">
      { loading ? 
        <RingLoader
          color={"#0a06eb"}
          loading={loading}
          size={150}
        />
      :
        <div>
          <Weather />
        </div> 
      }      
    </div>
  )
}

export default App
