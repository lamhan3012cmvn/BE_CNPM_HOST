const controller = require('./controller');
const productServices = require('../services/product.services')


const getAllProducts = async (req, res, next) => {
  try {
    const resServices = await productServices.getAllProducts()
    return controller.sendSuccess(res, resServices.data, 200, resServices.message)
  } catch (err) {
    return controller.sendError(res)
  }
}

const createProduct = async (req, res, next) => {
  try {
    const resServices = await productServices.createNewProduct(req.body)
    if (!resServices.success)
      return controller.sendSuccess(res, {}, 300, resServices.message)
    return controller.sendSuccess(res, resServices.data, 200, resServices.message)
  } catch (error) {
    return controller.sendError(res)
  }

}

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const resServices = await productServices.getProduct(id)
    if (!resServices.success)
      return controller.sendSuccess(res, {}, 300, resServices.message)
    return controller.sendSuccess(res, resServices.data, 200, resServices.message)
  } catch (error) {
    return controller.sendError(res)
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const { _id } = req.params
    const resServices = await productServices.updateProduct(_id, req.body)
    if (!resServices.success)
      return controller.sendSuccess(res, {}, 300, resServices.message)
    return controller.sendSuccess(res, resServices.data, 200, resServices.message)
  } catch (error) {
    return controller.sendError(res)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const resServices = await productServices.deleteProduct(id)
    if (!resServices.success)
      return controller.sendSuccess(res, {}, 300, resServices.message)
    return controller.sendSuccess(res, {}, 200, resServices.message)
  } catch (error) {
    return controller.sendError(res)
  }
}
module.exports = Controller = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
}
