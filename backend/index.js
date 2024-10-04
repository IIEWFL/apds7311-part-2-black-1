import express from "express"
const app = express()
import dotenv from "dotenv"
dotenv.config()
import routes from "./routes/routes.js"
import connectToMongo from "./dbconn/dbconn.js"
//using validations imports 
import helmet from "helmet"
import morgan from "morgan"

//middleware
app.use(express.json())
app.use(helmet()) // extra layer of security
app.use(morgan('combined')) // log http request on console

//connect to mongo
connectToMongo()

//routes
app.use(routes)

//listering ports - running on HTTP
//must be HTTPS - cert and key needed!!
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    
})