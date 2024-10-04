import express from "express"
const router = express.Router()
import Customer from "../models/customer.js"
import Transactions from "../models/transactions.js"

//validation more needed
//hash password
import bcrypt from "bcrypt"
// create json web token
import jwt from "jsonwebtoken"


router.get('/', (req, res) => {
    res.json({
        title: "this is default"
})
})

//register customer
router.post('/register', async (req, res) => {
    try {

        //check to see if they havent already registered
        const customer = await Customer.findOne({idNumber: req.body.idNumber})
        if(customer) {
            return res.status(409).send("Already registered, sign in or forgot password")
        }
        //add to payload
        const payload = {...req.body}
        //hash password - wait till salt is done, hash the request password and replace payload with new hashed password 
        const salt = await bcrypt.genSalt(12)
        const newPassword = await bcrypt.hash(req.body.password, salt)
        payload.password = newPassword
        const newCustomer = new Customer(payload)
    
        //save to mongoDB
        const result = await newCustomer.save()
        res.status(201).send(result) 
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }

})
//login customer
router.post('/login', async (req, res) => {
    try {
        //check to see if they havent already registered
        const customer = await Customer.findOne({accountNumber: req.body.accountNumber})

        //if customer is not found
        if(!customer) {
            return res.status(404).send("User not found, register!")
        }

        //compare password
        const correctPassword = await bcrypt.compare(req.body.password, customer.password)
        if(!correctPassword) {
            return res.status(401).send("Password is Incorrect!");
        }

        //generate token
        const token = jwt.sign({
            id: customer._id
        },process.env.JWT_SECRET)

        //store token in http cookie
        res.cookie('access_token', token, {httpOnly: true})

        //send response
        res.status(200).json({
            message: "Login Success",
            data: customer,
            status: 200
        })
        

    } catch (error) {
        return res.status(500).send("Internal Server Error")
    }
})
//add-transactions
router.post('/add-transactions', async (req, res) => {
    try {
        //add to payload
        const payload = {...req.body}
        const newTransactions = new Transactions(payload)
    
        //save to mongoDB
        const result = await newTransactions.save()
        res.status(201).send(result) 
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }

})
//get transactions
router.get('/get-transactions', async(req, res) => {
    try {
        const transactions = await Transactions.find()
        res.status(200).send(transactions)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
})

export default router