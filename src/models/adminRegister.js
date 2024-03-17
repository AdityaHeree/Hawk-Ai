import mongoose, { Mongoose } from "mongoose";

const adminRegister = new mongoose.Schema({
    name : {
        type : String,
        // required : true
    },
    email: {
        type: String,
        required: true, // Make sure this is set to true
        unique: true   // Optional: Enforces unique email addresses
    },
    password: {
        type: String,
        required: true // Make sure this is set to true
    }
});

export const Admin = mongoose.model('Admin',adminRegister);