import {Route,Routes} from 'react-router-dom'
import './App.css'
import Fetchitems from './compoents/Fetchitems'
import Addimage from './compoents/Addimage'

function App() {
  
  return (
    <div>
      <Fetchitems/>
      <Addimage/>
    </div>
  )
}

export default App
