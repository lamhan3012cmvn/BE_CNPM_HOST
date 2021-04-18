const controller = require('./controller');
const productServices = require('../services/product.services')


const getProducts = async (req, res, next) => {
  try {
    const resServices = productServices.Products()
  } catch (err) {
    controller.sendError(res)
  }
};

module.exports = Controller = { getProducts };
