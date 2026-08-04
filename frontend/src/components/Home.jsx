import { useContext } from "react"
import { dataContext } from "../context/UserContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"


const Home = () => {
    let {userData,setUserData,serverUrl} = useContext(dataContext)

    let navigate = useNavigate()
    if(!userData) navigate("/login")

    const handleLogout = async ()=>{
        try {
            await axios.post(serverUrl + "/api/logout",{},{
                withCredentials:true
            })
            setUserData(null)
            // navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='w-full h-screen bg-[#0d1818] flex flex-col justify-center items-center gap-5'>
         <div className='w-[100px] h-[100px] rounded-full bg-white overflow-hidden border-2 border-white relative cursor-pointer'>
                    <img src={userData.profileImage} alt=""  className='w-[100%] h-[100%]  '/>
                </div>
        <p className='text-white text-xl'>Hey <span className='font-bold text-[#3e8291]'>{userData.firstName}</span> , welcome to my First Authentication Project</p>
        <button className='text-black bg-[#1d474e] px-9 py-2 rounded-lg font-semibold hover:bg-[#49b4c7]' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home