import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config()

const auth = (req, res, next) => {
        const authHeader = req.header('Authorization')
        if(!authHeader) {
            return res.status(401).send('No auth header, nothing in header')
        }
        const parseToken = authHeader.split(' ')
        if(parseToken.length !== 2) {
            return res.status(401).send("Header format incorrect")
        }
        const token = parseToken[1]
        console.log("token", token);

        if(!token) {
            return res.status(401).send("No token provided")
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log("decoded", decoded);
            req.user = decoded
            next()
            
        } catch (error) {
            console.error("Token verify failed", error)
        }
}

export default auth