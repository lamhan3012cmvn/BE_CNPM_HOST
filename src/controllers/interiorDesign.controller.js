const controller = require('./controller');
const interiorDesignServices = require('../services/interiorDesign.services')

const getInteriorDesign = async (req, res, next) => {
    try {
        const resServices = await interiorDesignServices.getInteriorDesign()
        if(resServices.success)
            return controller.sendSuccess(res, resServices.data, 200, resServices.message)
        else return controller.sendSuccess(res, {}, 200, resServices.message)
    } catch (err) {
        return controller.sendError(res)
    }
}
const getInteriorDesignDetail = async (req, res, next) => {
    try {
        const { id } = req.params
        const resServices = await interiorDesignServices.getInteriorDesignDetail(id)
        if(resServices.success)
            return controller.sendSuccess(res, resServices.data, 200, resServices.message)
        else return controller.sendSuccess(res, {}, 200, resServices.message)
    } catch (err) {
        return controller.sendError(res)
    }
}
const getAllInteriorDesignByType = async (req, res, next) => {
    try {
        const resServices = await interiorDesignServices.getAllInteriorDesignByType(req.query)
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

const createTypeInteriorDesign = async (req, res, next) => {
    try {
        const resServices = await interiorDesignServices.createTypeInteriorDesign(req.value.body)
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }

}

module.exports = {
    getInteriorDesign,
    createNewInteriorDesign,
    updateInteriorDesign,
    deleteInteriorDesign,
    getInteriorDesignDetail,
    createTypeInteriorDesign,
    getAllInteriorDesignByType
}


