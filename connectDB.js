const mongoose=require('mongoose')
const { ErrorHandler } = require('./errorHandler/errorHandler')
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } 
    catch (error) {
        new ErrorHandler(401,error.message)
    }
}

module.exports={connectDB}