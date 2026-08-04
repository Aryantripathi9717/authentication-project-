import jwt from "jsonwebtoken"

export const checkAuth = (req,res,next) => {
    try {
        let token = req.cookies.token
        if(!token){
            return res.status(400).json({message : "User not Authenticated"})
        }
    
        let decoded = jwt.verify(token,process.env.JWT_SECRETE)

        req.userId = decoded.id
        next()
        
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}