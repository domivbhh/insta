const { ErrorHandler } = require("../errorHandler/errorHandler")
const User = require("../models/userModel")
const validateInputs = require("../validation/validator")

const loginController=async(req,res,next)=>{
    try {
        const{username,password}=req.body

        const newUser=await User.create({username,password})

        res.status(200).json({
            status:'success',
            message:"user login success"
        })
    } 
    catch (error) {
       new ErrorHandler(400,error.message)    
    }
}


module.exports=loginController