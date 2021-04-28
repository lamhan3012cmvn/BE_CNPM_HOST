const controller = require('./controller');
const productServices = require('../services/product.services')


const getProducts = async (req, res, next) => {
  try {
    const resServices = await productServices.getProducts()
    controller.sendSuccess(res, resServices.data, 200, resServices.message)
  } catch (err) {
    controller.sendError(res)
  }
}

const createProduct = async (req, res, next) => {
  try {
    const resServices = await productServices.createNewProduct(req.body)
    if (!resServices.success)
      return controller.sendSuccess(res, {}, 300, resServices.message)
    return controller.sendSuccess(res, resServices.data, 200, resServices.message)
  } catch (error) {
    controller.sendError(res)
  }

}

module.exports = Controller = {
  getProducts,
  createProduct
}
