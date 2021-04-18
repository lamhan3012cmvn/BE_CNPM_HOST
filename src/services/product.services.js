const PRODUCT = require('../models/Product')
const Products = async () => {
  try {
    const product = await PRODUCT.find({})

    return {
      message: 'Successfully get products',
      success: true,
      data: product
    }
  } catch (err) {
    return {
      message: 'An error occured',
      success: false
    }
  }
}
module.exports={
  Products
}