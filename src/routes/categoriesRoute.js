const express = require('express')
const Controller = require('../controllers/categories.controller')

const router = express.Router()

router.post('/createCategories', Controller.createCategories)

router.get('/getCategories', Controller.getCategories)

module.exports = router