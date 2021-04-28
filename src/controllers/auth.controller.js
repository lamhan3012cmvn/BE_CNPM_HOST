const controller = require("./controller");
const authServices = require("../services/auth.services")
const User = require("../models/User");

const register = async (req, res, next) => {
  try {

    console.log("register")
    const resServices = await authServices.register(req.value.body)

    if (!resServices.success) return controller.sendSuccess(res, resServices.data, 300, resServices.message)

    return controller.sendSuccess(res, resServices.data, 200, resServices.message)
  } catch (err) {
    return controller.sendError(res)
  }
}

const login = async (req, res, next) => {
  try {
    const resServices = await authServices.login(req.value.body)
    if (!resServices.success) {
      return controller.sendSuccess(res, {}, 300, resServices.message)
    }
    // const token = jwtServices.createToken(resServices.data._id)

    return controller.sendSuccess(res, resServices.data, 200, resServices.message)

  } catch (err) {
    return controller.sendError(res)
  }
}

const getAuth = async (req, res, next) => {
  try {
    console.log("errr", req)
    const body = req.value.body
    const _id = body.decodeToken.data
    const token = body.token
    console.log(`LHA:  ===> file: auth.controller.js ===> line 42 ===> token`, token)
    console.log(_id)
    const resServices = await authServices.getAuth({ _id, token })
    console.log(`LHA:  ===> file: auth.controller.js ===> line 45 ===> resServices`, resServices)
    return controller.sendSuccess(res, resServices.data, 200, resServices.message)
  } catch (error) { // bug
    console.log(error)
    return controller.sendError(res)
  }
}

const verify = async (req, res) => {
  try {
    const { username } = req.params
    const resServices = await authServices.verifyUser(username)
    if (!resServices.success) {
      return controller.sendSuccess(res, resServices.success, 300, resServices.message)
    }

    return controller.sendSuccess(res, resServices.success, 200, resServices.message)

  } catch (error) {
    return controller.sendError(res)
  }

}
const changePassword = async (req, res, next) => {
  try {
    const { newPassword, decodeToken } = req.value.body
    const resServices = await authServices.changePassword({ id: decodeToken._id, newPassword })
    return controller.sendSuccess(res, resServices.success, 200, resServices.message)
  } catch (error) {
    return controller.sendError(res)
  }

}
module.exports = {
  register,
  login,
  verify, getAuth,
  changePassword
}