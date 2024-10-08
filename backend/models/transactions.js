import mongoose from "mongoose";

const transctions = mongoose.Schema({
    amount: {type: String, required: true},
    status: {type: String, enum: ["Pending", "Success"], default: "Pending"},
    currency: { type: String, enum: ["Rand", "Dollar", "Yen", "Pound"], default: "Rand"},
    provider: { type: String, enum: ["SWIFT", "Other"], default: "SWIFT"},
    accountNumber: {type: String, required: true, match: /^[0-9]+$/},
    code: {type: String, required: true, match: /^[0-9]+$/,},
    idNumber: {type: String},

})

export default mongoose.model("transactions", transctions)