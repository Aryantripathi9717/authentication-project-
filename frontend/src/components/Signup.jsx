import React, { useContext, useRef, useState } from 'react'
import image from  '../assets/emptyprofile.webp'
import { dataContext } from '../context/UserContext'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  
    let file = useRef(null)

    let [firstName,setFirstName] = useState("")
    let [lastName,setLastName] = useState("")
    let [userName,setUserName] = useState("")
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")

    let {serverUrl,getUserData,setUserData} = useContext(dataContext)
    let navigate = useNavigate()

    let handleSignup = async (e)=>{
        e.preventDefault()
      try {
        let formData = new FormData()
        formData.append("firstName",firstName)
        formData.append("lastName", lastName)
        formData.append("userName",userName)
        formData.append("email",email)
        formData.append("password",password)
        if(backendImage)
        formData.append("profileImage",backendImage)
        let {data} = await axios.post(serverUrl + "/api/signup",formData,{
            withCredentials : true,
            headers : {'Content-Type' : "multipart/form-data"}
        })
        setUserData(data.user)
        await getUserData()
        navigate("/")
        console.log(data)
      } catch (error) {
        console.log(error)
      }
        
    }

    let [frontendImage,setFrontendImage] = useState(image)
    let [backendImage,setBackendImage] = useState(null)
    function handleImage(e){
      console.log(e.target.files[0])

      let img = e.target.files[0]
      setBackendImage(img)
      let realImage = URL.createObjectURL(img)
      setFrontendImage(realImage)
    }
    
      
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-black'>
        <div className='h-[500px] w-[450px] bg-slate-900  flex flex-col justify-center items-center gap-0'>
            <form action="" className='gap-5 w-full h-full flex flex-col justify-center items-center' onSubmit={handleSignup}>
                <div className='w-[120px] h-[120px] rounded-full bg-white overflow-hidden relative'>
                  <input type="file" hidden ref={file} onChange={handleImage} />
                    <img src={frontendImage} alt=""  />
                    {frontendImage === image ? <div className='text-black h-full w-full text-4xl absolute top-9 left-12 opacity-0 hover:opacity-100 '
                    onClick={()=>{file.current.click()}}>+</div> : null}
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