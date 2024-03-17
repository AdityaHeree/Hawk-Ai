import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        require : true
    },
    username : {
        type : String,
        require : true,
        unique : true,
        toLowerCase : true
    },
    password : {
        type : String,
        require : true
    },
    phoneNumber : {
        type : Number,
        require : true
    },
    camera : {
        type : Object.t
    }
},{
    timestamps : true
}); 

export const User = mongoose.model('User', userSchema);