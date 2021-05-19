const controller = require('./controller');
const interiorDesignServices = require('../services/interiorDesign.services')

const getInteriorDesign = async (req, res, next) => {
    try {
        const resServices = await interiorDesignServices.getInteriorDesign()
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (err) {
        return controller.sendError(res)
    }
}

const createNewInteriorDesign = async (req, res, next) => {
    try {
        const resServices = await interiorDesignServices.createNewInteriorDesign(req.value.body)
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }

}


const updateInteriorDesign = async (req, res, next) => {
    try {
        const resServices = await interiorDesignServices.updateInteriorDesign(req.value.body)
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }
}

const deleteInteriorDesign = async (req, res, next) => {
    try {
        const { id } = req.params
        const resServices = await interiorDesignServices.deleteInteriorDesign(id)
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, {}, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }
}

module.exports = {
    getInteriorDesign,
    createNewInteriorDesign,
    updateInteriorDesign,
    deleteInteriorDesign
}


