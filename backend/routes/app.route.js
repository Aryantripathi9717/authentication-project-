import express from "express"
import {login, signup} from "../controllers/app.controller.js"

let appRouter = express.Router()

appRouter.post("/signup",signup)
appRouter.post("/login",login)

export default appRouter