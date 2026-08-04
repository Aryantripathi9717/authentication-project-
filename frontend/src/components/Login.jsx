import React, { useContext, useState } from 'react'
import image from  '../assets/emptyprofile.webp'
import { dataContext } from '../context/UserContext'
import axios from "axios"

const Login = () => {
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")

    let {serverUrl,getUserData,setUserData} = useContext(dataContext)

    let handleLogin = async (e)=>{
        e.preventDefault()
      try {
        let {data} = await axios.post(serverUrl + "/api/login",{
            email,
            password
        },{
            withCredentials : true
        })
        setUserData(data.user)
        await getUserData()
        console.log(data)
      } catch (error) {
        console.log(error)
      }
        
    }
    

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-black'>
        <div className='h-[500px] w-[450px] bg-slate-900  flex flex-col justify-center items-center gap-0'>
            <form action="" className='gap-5 w-full h-full flex flex-col justify-center items-center' onSubmit={handleLogin}>
                <div className='w-[120px] h-[120px] rounded-full bg-white overflow-hidden relative'>
                    <img src={image} alt=""  />
                   </div>
                 <input type="email" placeholder='email' className='outline-none w-[93%] p-2 h-8' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                 <input type="password" placeholder='password' className='outline-none w-[93%] p-2 h-8' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                 <button className='bg-green-800 p-2 w-[100px] rounded-md hover:bg-green-600'>Submit</button>
            </form>
        </div>

    </div>
  )
}

export default Login