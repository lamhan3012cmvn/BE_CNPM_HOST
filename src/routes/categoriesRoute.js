const express = require('express')
const Controller = require('../controllers/categories.controller')

const router = express.Router()

router.post('/createCategory', Controller.createCategories)

router.put('/updateCategory/:id', Controller.updateCategory)

router.delete('/deleteCategory/:id', Controller.deleteCategory)

router.get('/getCategory', Controller.getCategories)

router.get('/getSelectCategoryByRoom/:id', Controller.getSelectCategoryByRoom)
module.exports = router