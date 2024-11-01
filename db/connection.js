import mongoose, { connect } from "mongoose";
import { config } from "dotenv";
config()
export const connectToDatabase =async()=>{
    await connect(process.env.MONGO_URL)
}
