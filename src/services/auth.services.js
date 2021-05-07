const USER = require('../models/User')
const bcrypt = require('bcryptjs')
const { ACCESS_TOKEN_SECRET } = require("../config")
const jwtServices = require("./jwt.services")
const moment = require('moment')
const nodemailer = require('nodemailer')

const register = async (body) => {
  try {
    console.log("services register")
    const { email, password } = body
    //check if email is already in the database
    const emailExist = await USER.findOne({
      email: email
    })
    console.log(`LHA:  ===> file: auth.services.js ===> line 14 ===> emailExist`, emailExist)
    if (emailExist) return {
      message: 'Email already exist !!',
      success: false
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log(`LHA:  ===> file: auth.services.js ===> line 20 ===> hashedPassword`, hashedPassword)

    const newUser = new USER({ email, password: hashedPassword })
    console.log(`LHA:  ===> file: auth.services.js ===> line 24 ===> newUser`, newUser)
    console.log(`LHA:  ===> file: auth.services.js ===> line 22 ===> newUser`, newUser)
    const token = jwtServices.createToken(newUser._id);
    const tokenExp = moment().add(30, 'days')

    newUser.token = token
    newUser.tokenExp = tokenExp
    await newUser.save()
    sendMail(email)
    return {
      message: 'Successfully registered',
      success: true,
      data: newUser
    };

  } catch (err) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

const login = async (body) => {
  try {
    const {
      email,
      password
    } = body
    const user = await USER.findOne({
      email
    }).lean()
    if (!user) {
      return {
        message: 'Invalid email !!',
        success: false
      }
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return {
        message: 'Invalid password !!',
        success: false
      }
    }

    return {
      message: 'Successfully login',
      success: true,
      data: user
    };
  } catch (err) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

const getAuth = async (body) => {
  try {
    console.log("body:", body)
    const user = await USER.find(body)
    if (!user) {
      return {
        message: 'Get Auth Fail',
        success: false
      }
    }
    return {
      message: 'Successfully Get Auth',
      success: true,
      data: user
    };
  }
  catch (err) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}
const findUserNameAndPass = async (_id, body) => {
  try {
    const user = await User.findById(_id)
    const oldPassword = body.oldPassword
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
    if (isPasswordMatch) return user;
    return null
  } catch (error) {
    return null
  }

}
const changePassword = async (id, body) => {
  try {
    const user = findUserNameAndPass(id, body)
    if (!user) {
      return {
        message: 'Do not Found User',
        success: false,
        data: user
      }
    }
    const newPassword = await bcrypt.hash(body.newPassword, 8)
    user.password = newPassword
    await user.save()

    return {
      message: 'Change Password Successfully',
      success: true
    }
  } catch (error) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

const getProfile = async (id) => {
  try {
    const info = await USER.findOne({ _id: id })
    return {
      message: 'Successfully get information',
      success: true,
      data: info
    }
  } catch (error) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

const updateUserProfile = async (id, body) => {
  try {
    await USER.updateOne({ _id: id }, body)

    return {
      message: 'Successfully update user',
      success: true,
      data: body
    }
  } catch (error) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

const verifyUser = async (email) => {
  try {
    const user = await USER.findOne({ email: email })
    if (user) {
      user.isVerify = true
      await user.save()

      return {
        message: 'Email Confirm',
        success: true
      }

    } else {
      return {
        message: 'User not found',
        success: false
      }
    }

  } catch (error) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

const sendMail = (email) => {
  let transport = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'holmesz17@outlook.com',
      pass: 'phamtandat1712'
    }
  })

  let mailOptions = {
    from: 'holmesz17@outlook.com',
    to: email,
    subject: 'Email confirmation',
    html: `Press <a href=http://localhost:3000/auth/verify/${email}> here </a> to verify your email.`
  }
  transport.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.log(err)
    } else {
      console.log('Message sent')
    }
  })
}

module.exports = {
  register,
  login,
  getAuth,
  changePassword,
  getProfile,
  updateUserProfile,
  verifyUser
}