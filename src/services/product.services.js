const Product = require('../models/Product')

const getProducts = async () => {
  try {
    const product = await Product.find({})
    return {
      message: 'Successfully get products',
      success: true,
      data: product
    }
  } catch (err) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

const createNewProduct = async (body) => {
  try {
    const newProduct = new Product(body)

    const existProduct = await Product.findOne({ productId: body.productId })
    if (existProduct) {
      return {
        message: 'Product already exist',
        success: false,
        data: newProduct
      }
    }

    await newProduct.save()
    return {
      message: 'Successfully create products',
      success: true,
      data: newProduct
    }
  } catch (error) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

module.exports = {
  getProducts,
  createNewProduct
}