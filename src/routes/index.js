const express = require('express')
const productRoute = require('./productRoute')
const authRoute = require('./authRoute')
const categoriesRoute = require('./categoriesRoute')
const roomRoute = require('./roomRoute')
const router = express.Router()

router.use('/product', productRoute)
router.use('/room', roomRoute)
router.use('/category', categoriesRoute)
router.use('/auth', authRoute)

module.exports = router