import express from "express"
import {getUserData, login, logout, signup} from "../controllers/app.controller.js"
import { upload } from "../middlewares/multer.js"
import { checkAuth } from "../middlewares/checkAuth.js"

let appRouter = express.Router()

appRouter.post("/signup",upload.single("profileImage"),signup)
appRouter.post("/login",login)
appRouter.post("/logout",logout)
appRouter.get("/getuserdata",checkAuth,getUserData)

export default appRouter