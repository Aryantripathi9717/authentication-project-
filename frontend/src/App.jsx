import React, { useContext } from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import {Routes, Route, useNavigate} from "react-router-dom"
import { dataContext } from './context/UserContext'
import Home from './components/Home'
import { login } from '../../backend/controllers/app.controller'

const App = () => {
  let {userData} = useContext(dataContext)
  let navigate = useNavigate()
  return (
    <Routes>
      <Route path="/signup" element= {!userData ? <Signup/> : navigate("/")}/>
      <Route path="/login" element= {!userData ? <Login/> : navigate("/")}/>
      <Route path="/" element= {userData ? <Home/> : <Login/>}/>

    </Routes>
  )
}

export default App