const joi = require("@hapi/joi")

const schemas = {
  register: joi.object().keys({
    email: joi.string().min(6).email().required(),
    password: joi.string().min(6).required()
  }),

  login: joi.object().keys({
    email: joi.string().min(6).email().required(),
    password: joi.string().min(6).required()
  }),

  changePassword: joi.object().keys({
    newPassword: joi.string().min(6).max(16).required()
  }),

  update: joi.object().keys({
    email: joi.string().min(6).email().required(),
    password: joi.string().min(6).required(),
    fullName: joi.string().min(6),
    phone: joi.string().min(10).max(10)
  }),
  verify:joi.object().keys({
    email:joi.string().min(6).email().required(),
    password: joi.string().min(6).required(),
    otp:joi.string().min(6).max(6).required()
  })
}


module.exports = schemas