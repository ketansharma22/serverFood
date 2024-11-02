import express from 'express'
import {connectToDatabase} from './db/connection.js'
import appRouter from './routes/index.js'
import cors from 'cors'
import cookieparser from 'cookieparser'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
config()
const app=express()
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use('/api/v1',appRouter)

connectToDatabase().then(
    app.listen(process.env.PORT,()=>console.log("server open ho gaya h"))
).catch((error)=>{console.log(error)})
