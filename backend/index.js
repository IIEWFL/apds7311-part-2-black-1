import express from "express"
const app = express()
import dotenv from "dotenv"
dotenv.config()
import routes from "./routes/routes.js"
import connectToMongo from "./dbconn/dbconn.js"
//using validations imports 
import helmet from "helmet"
import morgan from "morgan"
import cors from 'cors'
import https from 'https'
import fs from 'fs'

//middleware
app.use(cors(
    {
        origin: 'http://localhost:4200',  // The URL of your Angular frontend
        credentials: true,
    }
))
app.use(express.json())
app.use(helmet()) // extra layer of security
app.use(morgan('combined')) // log http request on console

//connect to mongo
connectToMongo()

//routes
app.use(routes)


//listening ports - running on HTTPS
const PORT = process.env.PORT || 5000
//SSL certificate & key
const options = {
    cert: fs.readFileSync('key/cert.pem'),
    key: fs.readFileSync('key/cert.key')
}
https.createServer(options, app).listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})
//listening ports - running on HTTP
// app.listen(PORT, () => {
//     console.log(`Server running on ${PORT}`);
// })