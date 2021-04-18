const express = require('express')
const path = require('path')
const {PORT} =require('./config')
const app = express()
const db =require('./config/db')
const route = require('./routes')

//connect db
db.connect()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(route)

app.listen(PORT, () => {
    console.log(`App running in port ${PORT}`)
})