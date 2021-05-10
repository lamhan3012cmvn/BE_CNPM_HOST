const express = require('express')
const productRoute = require('./productRoute')
const authRoute = require('./authRoute')
const categoriesRoute = require('./categoriesRoute')
const roomRoute = require('./roomRoute')
const { route } = require('./productRoute')
const router = express.Router()

router.use('/product', productRoute)
router.use('/room', roomRoute)
router.use('/category', categoriesRoute)
router.use('/auth', authRoute)

router.get('/info', (req, res) => res.status(200).send('Welcome to server aws'))

module.exports = router