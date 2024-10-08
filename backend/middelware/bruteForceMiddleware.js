// tip: comes as is
// express mongoose makes the schema for you, make a custom schema to store and mange data better
import expressBrute from "express-brute";
import MongooseStore from "express-brute-mongoose";
import mongoose from "mongoose";

//new schema
const bruteForceSchema = new mongoose.Schema({
    //encrypted IP address
    _id: String,
    // number of times brute force attempts was made
    data: {
        count: Number,
        lastRquest: Date,
        firstRequest: Date
    },
    // when this log is going to expire
    expires: {type: Date, index: {expires: '1d'}}
})

// set up brute force collection
const bruteForceModel = mongoose.model("bruteforce", bruteForceSchema)

// keep track of attempts made using store - store model with store
const store = new MongooseStore(bruteForceModel)

// how many tries do you want to stop somesome and when they can try again
const bruteForce = new expressBrute(store, {
    freeRetries: 3,
    minWait: 1 * 60 * 1000, // 1 min
    MaxWait: 2 * 60 * 1000, // 2 min
    failCallback: function(req, res, next) {
        res.status(429).json({
            message: "Too many failed attempts, Try again in 1 minute",
            nextValidRequestDate
        })
    }
})

export default bruteForce