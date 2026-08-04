import jwt from "jsonwebtoken"

export const generateWebToken = (id) => {
    let token = jwt.sign({id},process.env.JWT_SECRETE, {
        expiresIn : "7d"
    })
    return token
}