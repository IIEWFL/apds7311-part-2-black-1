import mongoose from "mongoose";

const transctions = mongoose.Schema({
    amount: {type: Number, required: true},
    status: {type: String, enum: ["Pending", "Success"], default: "Pending"},
    currency: { type: String, enum: ["Rand", "Dollor", "Yen", "Pound"], default: "Rand"},
    provider: { type: String,enum: ["SWIFT", "Other"], default: "SWIFT"},
    accountNumber: {type: Number, required: true},
    code: {type: Number, required: true},

})

export default mongoose.model("transactions", transctions)