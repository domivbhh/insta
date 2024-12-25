const express = require('express')
const { PostData, GetData } = require('../controllers/userController')

const userRouter = express.Router()

userRouter.post('/post', PostData)
userRouter.get('/get', GetData)

module.exports = userRouter