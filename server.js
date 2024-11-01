import express from 'express'
import {connectToDatabase} from './db/connection.js'
import appRouter from './routes/index.js'
import cors from 'cors'
import { config } from 'dotenv'
config()
const app=express()
app.use(express.json())
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use('/api/v1',appRouter)

connectToDatabase().then(
    app.listen(process.env.PORT,()=>console.log("server open ho gaya h"))
).catch((error)=>{console.log(error)})
