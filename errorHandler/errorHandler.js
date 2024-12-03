class ErrorHandler extends Error{
    constructor(code,message){
        super(message,code)
        this.code=code
        this.message=message
    }
}

const errorController=(err,req,res,next)=>{
    let statusCode=err.code || 500
    let statusMessage=err.message || "Something gone Wrong"
    return res.status(statusCode).json({
        status:'fail',
        error:statusMessage
    })
}

module.exports={errorController,ErrorHandler}