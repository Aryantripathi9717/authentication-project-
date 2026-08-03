import React, { useContext, useState } from 'react'
import image from  '../assets/emptyprofile.webp'
import { dataContext } from '../context/UserContext'
import axios from "axios"

const Signup = () => {

    let [firstName,setFirstName] = useState("")
    let [lastName,setLastName] = useState("")
    let [userName,setUserName] = useState("")
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")

    let {serverUrl} = useContext(dataContext)

    let handleSignup = async (e)=>{
        e.preventDefault()
      try {
        let {data} = await axios.post(serverUrl + "/api/signup",{
            firstName,
            lastName,
            userName,
            email,
            password
        },{
            withCredentials : true
        })
        console.log(data)
      } catch (error) {
        console.log(error)
      }
        
    }
    

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-black'>
        <div className='h-[500px] w-[450px] bg-slate-900  flex flex-col justify-center items-center gap-0'>
            <form action="" className='gap-5 w-full h-full flex flex-col justify-center items-center' onSubmit={handleSignup}>
                <div className='w-[120px] h-[120px] rounded-full bg-white overflow-hidden relative'>
                    <img src={image} alt=""  />
                    <div className='text-black h-full w-full text-4xl absolute top-9 left-12 opacity-0 hover:opacity-100 '>+</div>
                </div>
                <div className='w-full flex justify-center items-center gap-3'>
                    <input type="text" placeholder='firstName' className='outline-none w-[45%] h-8 p-2' value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                    <input type="text" placeholder='lastName' className='outline-none w-[45%] h-8 p-2' value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                </div>
                 <input type="text" placeholder='userName' className='outline-none w-[93%]  h-8 p-2' value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
                 <input type="email" placeholder='email' className='outline-none w-[93%] p-2 h-8' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                 <input type="password" placeholder='password' className='outline-none w-[93%] p-2 h-8' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                 <button className='bg-green-800 p-2 w-[100px] rounded-md hover:bg-green-600'>Submit</button>
            </form>
        </div>

    </div>
  )
}

export default Signup