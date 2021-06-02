const controller = require('./controller')
const statisticsServices = require('../services/statistics.services')

module.exports.getRankTopTenPeopleBill = async (req, res, next) => {
    try {
        const resServices = await statisticsServices.rankTopTenPeopleBill()
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }

}

module.exports.getRankTopTenProductBill = async (req, res, next) => {
    try {
        const resServices = await statisticsServices.rankTopTenProductBill()
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }

}

module.exports.getRankTopTenProductCancel = async (req, res, next) => {
    try {
        const resServices = await statisticsServices.rankTopTenProductCancel()
        if (!resServices.success)
            return controller.sendSuccess(res, {}, 300, resServices.message)
        return controller.sendSuccess(res, resServices.data, 200, resServices.message)
    } catch (error) {
        return controller.sendError(res)
    }

}
