const controller = require('./controller');
const productServices = require('../services/product.services')


const getAllProducts = async (req, res, next) => {
  try {
    console.log(req.query.page);
    const resServices = await productServices.getAllProducts(req.query)
    return controller.sendSuccess(res, resServices.data, 200, resServices.message)
  } catch (err) {
    console.log(err);
    return controller.sendError(res)
  }
}

const createProduct = async (req, res, next) => {
  try {
    const resServices = await productServices.createNewProduct(req.body)
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

const getProductByRoom = async (req, res, next) => {
  try {
    const { FK_Room } = req.params
    const resServices = await productServices.getProductByRoom(FK_Room)
    if (!resServices.success)
      return controller.sendSuccess(res, {}, 300, resServices.message)
    return controller.sendSuccess(res, resServices.data, 200, resServices.message)
  } catch (error) {
    return controller.sendError(res)
  }
}

const getProductByCategory = async (query) => {
  try {
    let idCategory = query.idCategory;
    let perPage = query.limit || 12;
    let page = query.page || 1;
    let asc = query.asc == 'true' || true;
    let bodySort = (query.sortByName == 'true')
      ? {
          Name: 1,
        }
      : {
          Price: asc ? 1 : -1,
        } || {};
    const result = await PRODUCT.find({ FK_Category: idCategory })
      .sort(bodySort)
      .skip(perPage * page - perPage)
      .limit(perPage);
    return {
      message: "Successfully get product",
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

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
const getFilter =async (req,res,next)=>{
  try {
    const resServices = await productServices.getFilter()
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
  getProductByRoom,
  getProductByCategory,
  updateProduct,
  deleteProduct,
  getFilter
}