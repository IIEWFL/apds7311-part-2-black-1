import mongoose, { Model, model } from "mongoose";

//customer schema
//validations needed
const customerSchema = mongoose.Schema({
    // email: {type: String, required: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/},  // Email format
    fullName: {type: String, required: true, minlength: 4},
    idNumber: {type: String, required: true, minlength:13, maxlength:13, match: /^[0-9]{13}$/, index: {unique: true}},// 13 digits only
    accountNumber: {type: String, required: true, match: /^[0-9]+$/},
    password: {type: String, required: true},
    balance: {type: Number, default: 0},
    username: {type: String}
})

// Middleware to set the username based on idNumber before saving
customerSchema.pre('save', function(next) {
    if (this.isNew) {
        this.username = this.fullName;
    }
    next();
});

//exporting schema
export default mongoose.model('customer', customerSchema)