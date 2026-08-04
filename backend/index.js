import express from "express"
import dotenv from "dotenv"
import appRouter from "./routes/app.route.js"
import dns from "dns"
import { connectDB } from "./config/db.js"
import cors from "cors"
import cookieParser from "cookie-parser"

let app = express()
dotenv.config()
dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
])

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api",appRouter);

app.get("/",(req,res)=>{
    res.json({message : "Authentication"})
})

let port = process.env.PORT
app.listen(port,(req,res)=>{
    connectDB()
    console.log("Server has started at port",port)
})