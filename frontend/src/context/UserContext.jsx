import axios from "axios";
import {  createContext, useEffect, useState } from "react";

export const dataContext = createContext();

function UserContext({children}){
    let serverUrl = "http://localhost:8000"

    let [userData,setUserData] = useState(null)

    async function getUserData(){
        try {
            let {data} = await axios.get(serverUrl + "/api/getuserdata",{
              withCredentials :true
            })
            setUserData(data)
        } catch (error) {
            setUserData(null)
            console.log(error)
        }
    }

    useEffect(()=>{
        getUserData();
    },[])

    let data = {
        serverUrl,setUserData,userData,getUserData
    }
    return (
        <dataContext.Provider value={data}>
            {children}
        </dataContext.Provider>
    )
}

export default UserContext