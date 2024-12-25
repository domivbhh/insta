const express = require('express')
const { errorController } = require('./errorHandler/errorHandler')
const cors = require('cors')
const userRouter = require('./router/userRouter')

const app = express()

app.use(express.json())
app.use(cors({
  origin: '*'
}))
app.options('*', cors())

app.use("/instagram", userRouter)
app.use(errorController);


app.listen(process.env.PORT, async () => {
  console.log(`server is listening to ${process.env.PORT}`);
});




