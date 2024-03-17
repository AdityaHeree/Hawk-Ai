import { asyncHandler} from '../utils/asynHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { Admin } from '../models/adminRegister.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const registerAdmin = asyncHandler(async (req,res)=>{
    const { email, password , confirmPassword} = req.body

    console.log(email+ " " + password)

    if([email,password,confirmPassword].some((field)=>{field?.trim() === ""}))
    {
        throw new ApiError(400, "All fields are required")
    }

    if(!(password == confirmPassword))
    {
        throw new ApiError(400, "Both Password Field Not match ")
    }
    // const existedUser = await registerAdmin.findOne({
    // })

    // if (existedUser) {
    //     throw new ApiError(409, "User with email already exists")
    // }

    const admin = await Admin.create({
        email,
        password
    })

    const createdAdmin = await Admin.findById(admin._id).select(" -password -refreshToken")

    if(!createdAdmin)
    {
        throw new ApiError(500, "Something went wrong during Register Admin")
    }

    return res.status(201).json(
        new ApiResponse(
            200,
            createdAdmin,
            "Admin Register Successfullly"
        )
    )
})


export {
    registerAdmin
}