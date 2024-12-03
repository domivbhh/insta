const express=require('express')
const loginController = require('../controllers/userController')

const userRouter=express.Router()

userRouter.post('/profile',loginController)

module.exports=userRouter