import {  createContext } from "react";

export const dataContext = createContext();

function UserContext({children}){
    let serverUrl = "http://localhost:8000"
    let data = {
        serverUrl
    }
    return (
        <dataContext.Provider value={data}>
            {children}
        </dataContext.Provider>
    )
}

export default UserContext