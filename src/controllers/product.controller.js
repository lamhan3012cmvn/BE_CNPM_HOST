const controller = require('./controller')
const productServices = require('../services/product.services')



const rateProduct=async (req,res,next)=>{
  try {
    const idUser = req.value.body.decodeToken.data;
    const rate = req.value.body;
    rate.idUser = idUser;
    const resServices = await productServices.rateProduct(rate);
    if (!resServices.success)
      return controller.sendSuccess(res, resServices.success, 300, resServices.message)
    return controller.sendSuccess(res, resServices.data, 200, resServices.message)
  } catch (error) {
    return controller.sendError(res)
  }
}
const getAllProducts = async (req, res, next) => {
  try {
    const resServices = await productServices.getAllProducts(req.query)
    return controller.sendSuccess(res, resServices.data, 200, resServices.message)
  } catch (err) {
    console.log(err);
    return controller.sendError(res)
  }
}

const createProduct = async (req, res, next) => {
  try {
    const resServices = await productServices.createNewProduct(req.value.body)
    if (!resServices.success)
      return controller.sendSuccess(res, resServices.success, 300, resServices.message)
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

const getProductsRoom = async (req, res, next) => {
  try {
    const resServices = await productServices.getProductRoom()
    if (!resServices.success)
      return controller.sendSuccess(res, {}, 300, resServices.message)
    return controller.sendSuccess(res, resServices.data, 200, resServices.message)
  } catch (error) {
    return controller.sendError(res)
  }
}

const getProductByCategory = async (req, res, next) => {
  try {
    const resServices = await productServices.getProductByCategory(req.query)
    if (!resServices.success)
      return controller.sendSuccess(res, {}, 300, resServices.message)
    return controller.sendSuccess(res, resServices.data, 200, resServices.message)
  } catch (error) {
    console.log(error)
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
const getFilter = async (req, res, next) => {
  try {
    const resServices = await productServices.getFilter()
    if (!resServices.success)
      return controller.sendSuccess(res, {}, 300, resServices.message)
    return controller.sendSuccess(res, resServices.data, 200, resServices.message)
  } catch (error) {
    return controller.sendError(res)
  }
}

const searchProduct = async (req, res, next) => {
  try {
    const searchField = req.query.tags
    const resServices = await productServices.searchProduct(searchField)
    if (!resServices.success)
      return controller.sendSuccess(res, {}, 300, resServices.message)
    return controller.sendSuccess(res, resServices.data, 200, resServices.message)
  } catch (error) {
    return controller.sendError(res)
  }
}

const filterByPrice = async (req, res, next) => {
  try {
    const price = req.query.price
    const resServices = await productServices.filterByPrice(price)
    if (!resServices.success)
      return controller.sendSuccess(res, {}, 300, resServices.message)
    return controller.sendSuccess(res, resServices.data, 200, resServices.message)
  } catch (error) {
    return controller.sendError(res)
  }
}

module.exports = Controller = {
  getAllProducts,
  createProduct,
  getProduct,
  getProductsRoom,
  getProductByCategory,
  updateProduct,
  deleteProduct,
  getFilter,
  searchProduct,
  filterByPrice,
  rateProduct
}