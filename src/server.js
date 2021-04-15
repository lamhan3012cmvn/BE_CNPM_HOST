const express = require('express')
const path = require('path')
const port = process.env.PORT
const app = express()

const userRouter = require('./routes/userRoute')
const productRouter = require('./routes/productRoute')



const db = require('./config/db')

//connect db
db.connect()


app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())


app.use(userRouter)
app.use(productRouter)


app.listen(port, () => {
    console.log(`App running in port ${port}`)
})