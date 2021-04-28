const controller = require('./controller');
const categoriesServices = require('../services/categories.services')


const getCategories = async (req, res, next) => {
    try {
        const resServices = await categoriesServices.getCategories()
        controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (err) {
        controller.sendError(res)
    }
}

const createCategories = async (req, res, next) => {
    try {
        const resServices = await categoriesServices.createNewCategories({ ...req.body })
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (error) {
        controller.sendError(res)
    }

}

module.exports = Controller = {
    getCategories,
    createCategories
}
