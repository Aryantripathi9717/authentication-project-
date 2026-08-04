import express from "express"
import {login, signup} from "../controllers/app.controller.js"
import { upload } from "../middlewares/multer.js"

let appRouter = express.Router()

appRouter.post("/signup",upload.single("profileImage"),signup)
appRouter.post("/login",login)

export default appRouter