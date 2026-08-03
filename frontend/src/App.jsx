import React from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import {Routes, Route} from "react-router-dom"

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element= {<Signup/>}/>
      <Route path="/login" element= {<Login/>}/>

    </Routes>
  )
}

export default App