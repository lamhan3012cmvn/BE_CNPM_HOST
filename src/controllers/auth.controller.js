const controller =require("./controller");
const authServices= require("../services/auth.services")
const jwtServices=require("../services/jwt.services")

const register = async (req, res, next) => {
  try {
    console.log(req.value.body)
    const resServices=await authServices.register({...req.value.body})
    
    if(!resServices) return controller.sendSuccess(res, resServices.data,300,resServices.message)
    console.log(resServices)

    resServices.data.token=jwtServices.createToken(resServices.data._id)
    return controller.sendSuccess(res, resServices.data,200,resServices.message)
  } catch (err) {
    controller.sendError(res)
  }
}
const login = async (req, res, next) => {
  try {
    const resServices =await authServices.login({...req.value.body})
    if(!resServices.success)
    {
      return controller.sendSuccess(res, resServices.data,300,resServices.message)
    }
    console.log(resServices)  
    resServices.data.token=jwtServices.createToken(resServices.data._id)
    return controller.sendSuccess(res, resServices.data,200,resServices.message)
   
  } catch (err) {
    return controller.sendError(res)
  }
}

module.exports ={
  register,
  login
}