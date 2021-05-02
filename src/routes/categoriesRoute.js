const express = require('express')
const Controller = require('../controllers/categories.controller')

const router = express.Router()

router.post('/createCategory', Controller.createCategories)

router.put('/updateCategory/:id', Controller.updateCategory)

router.delete('/deleteCategory/:id', Controller.deleteCategory)

router.get('/getCategory', Controller.getCategories)

module.exports = router