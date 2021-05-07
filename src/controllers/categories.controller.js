const controller = require('./controller')
const categoriesServices = require('../services/product.services')


const getCategories = async (req, res, next) => {
    try {
        const resServices = await categoriesServices.getCategories()
        controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (err) {
        return controller.sendError(res)
    }
}

const createCategories = async (req, res, next) => {
    try {
        const resServices = await categoriesServices.createNewCategory({ ...req.body })
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }

}


const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        const resServices = await categoriesServices.updateCategory(id, req.body)
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        const resServices = await categoriesServices.deleteCategory(id)
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, {}, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }
}

module.exports = Controller = {
    getCategories,
    createCategories,
    updateCategory,
    deleteCategory
}
