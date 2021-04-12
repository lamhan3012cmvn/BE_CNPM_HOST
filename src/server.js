const express = require('express')
const path = require('path')
const port = process.env.PORT
const app = express()

const userRouter = require('./routes/userRoute')



const db = require('./config/db')

//connect db
db.connect()


app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(userRouter)


app.listen(port, () => {
    console.log(`App running in port ${port}`)
})