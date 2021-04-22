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
      message: 'An error occured',
      success: false
    }
  }
}

const createNewProduct = async (body) => {
  try {
    // console.log("body", body)
    const newProduct = new Product(body)
    // console.log("new", newProduct)
    //check
    await newProduct.save()
    // console.log('???')
    return {
      message: 'Successfully create products',
      success: true,
      data: newProduct//looix day nek
    }

  } catch (error) {
    console.log('chay vao day an lz a` ???')
    return {
      message: 'An error occured',
      success: false
    }
  }
}

module.exports = {
  getProducts,
  createNewProduct
}