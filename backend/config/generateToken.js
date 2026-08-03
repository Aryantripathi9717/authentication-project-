import jwt from "jsonwebtoken"

export const generateWebToken = async (id)=>{
    try {
        await jwt.sign({id},process.env.JWT_SECRETE,{
            expiresIn : "7d"
        })
    } catch (error) {
        console.log("Token Generation Error")
    }
}