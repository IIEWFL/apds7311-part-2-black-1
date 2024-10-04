import mongoose, { Model, model } from "mongoose";

//customer schema
//validations needed
const customerSchema = mongoose.Schema({
    email: {type: String, required: true, minlength:4},
    idNumber: {type: Number, required: true, minlength:13, maxlength:13, index: {unique: true}},
    password: {type: String, required: true},
    accountNumber: {type: Number, required: true}
})

//exporting schema
export default mongoose.model('customer', customerSchema)