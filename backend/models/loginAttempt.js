import mongoose from "mongoose";

const loginAttemptSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: true,
        immutable: true,
        trim: true,
        match: /^[a-zA-Z0-9_]+$/, //"Only alphanumeric characters and underscore"
    },
    ipAddress: {
        type: String,
        required: true,
        immutable: true,
    },
    successfulLogin: {
        type: Boolean,
        required: true,
        immutable: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});

export default mongoose.model("LoginAttempts", loginAttemptSchema)