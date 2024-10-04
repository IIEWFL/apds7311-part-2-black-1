import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
 
//connects to mongoDB local then Atlas
const connectToMongo = async () => { await mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("connected to local"))
.catch(async (error)=> {console.log("error", error)
    try {
       await mongoose.connect(process.env.MONGO_ATLAS)
        console.log("connected to Atlas")
    } catch (error) {
        console.log("atlas error", error)
    }
})}

//make it publically available 
export default connectToMongo