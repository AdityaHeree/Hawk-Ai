import { asyncHandler } from "../utils/asynHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {Admin} from "../models/adminRegister.js";
import {ApiResponse} from "../utils/ApiResponse.js"


const adminRegister = asyncHandler( async( req, res) => {
    const {email, password , confirmPassword} = req.body;

    console.log("email : " + email)
    if ([email,password,confirmPassword].some((field) => field?.trim() ==="" )) {
        throw new ApiError(400, "Required All Fields")
    }

    if (!(password ==confirmPassword)) {
        throw new ApiError(400, "Both Password Not Match");
    }

    const existedAdmin =  Admin.findOne({email});

    if (!existedAdmin) {
        throw new ApiError(409, "this email Already Exist.")
    }

    const admin = await Admin.create({
        email : email.toLowerCase(),
        password
    })

    const createdAdmin = await Admin.findById(admin._id).select("-password");

    if (!createdAdmin) {
        throw new ApiError(500, "Somwthing Went Wrong While Uploading on DB.");
    }

    return res.status(201).json(
        new ApiResponse(200,createdAdmin,"Admin Registered Successfully")
    )

})


export { adminRegister }