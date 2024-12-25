const express=require('express')
const dotenv=require('dotenv')
const { errorController } = require('./errorHandler/errorHandler')
const { connectDB } = require('./connectDB')
// const loginController = require('./controllers/userController')
const cors=require('cors')
const userRouter = require('./router/userRouter')

const app=express()
dotenv.config()


app.use(express.json())
app.use(cors())

app.use("/instagram",userRouter)
app.use(errorController);

// connectDB().then(()=>{
//   console.log('DbConnected ')
  
// }).catch((err)=>console.log(err))

app.listen(process.env.PORT, async () => {
  console.log(`server is listening to ${process.env.PORT}`);
});




