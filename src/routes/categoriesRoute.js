const express = require('express')
const Controller = require('../controllers/categories.controller')

const router = express.Router()

router.get('/getCategories', Controller.getCategories)

router.post('/createCategories', Controller.createCategories)

module.exports = router