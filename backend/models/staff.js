import mongoose from "mongoose";

//schema set up staff
//validations needed
const staffSchema = mongoose.Schema({
    username: {type: String, required: true, minlength: 3, match: /^[a-zA-Z0-9]+$/,},
    password: {type: String, required: true, minlength: 4},
})

//making schema public
export default mongoose.model("staff", staffSchema)