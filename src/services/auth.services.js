const USER = require('../models/User')
const bcrypt = require('bcryptjs')
const { ACCESS_TOKEN_SECRET } = require("../config")
const jwtServices = require("./jwt.services")
const moment = require('moment')
const nodemailer = require('nodemailer')

const register = async (body) => {
  try {
    const { email, password ,fullName} = body
    //check if email is already in the database
    const emailExist = await USER.findOne({
      email: email
    })
    if (emailExist) return {
      message: 'Email already exist !!',
      success: false
    }
    const hashedPassword = await bcrypt.hash(password, 8)
    const otp =  generateOTP()

    const newUser = new USER({ email, password: hashedPassword, otp: otp ,fullName})
    sendMail(email, otp)
    await newUser.save()
    return {
      message: 'Successfully registered',
      success: true,
      data: {}
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
    })
    if (!user) {
      return {
        message: 'Invalid email !!',
        success: false
      }
    }
    if (!user.isVerify) {
      const otp = generateOTP()
      user.otp = otp
      sendMail(email, otp)
      //await user.updateOne({ "email": email }, { $set: { "otp": otp } })
      await user.save()
      return {
        message: 'Please verify your account',
        success: false,
      }
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return {
        message: 'Invalid password !!',
        success: false
      }
    }
    const generateToken=jwtServices.createToken(user._id)
    return {
      message: 'Successfully login',
      success: true,
      data: {token:generateToken, isAdmin: user.isAdmin,},
    };
  } catch (err) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

const loginAdmin = async (body) => {
  try {
    const {
      email,
      password
    } = body
    const user = await USER.findOne({
      email,
      isAdmin:true
    })
    if (!user) {
      return {
        message: 'Login Fail',
        success: false
      }
    }
    if (!user.isVerify) {
      const otp = generateOTP()
      user.otp = otp
      sendMail(email, otp)
      //await user.updateOne({ "email": email }, { $set: { "otp": otp } })
      await user.save()
      return {
        message: 'Please verify your account',
        success: false,
      }
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return {
        message: 'Login Fail',
        success: false
      }
    }
    const generateToken=jwtServices.createToken(user._id)
    return {
      message: 'Successfully login',
      success: true,
      data: {token:generateToken, isAdmin: user.isAdmin,},
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
    const user = await USER.findById(body)
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
    const userUpdate=await USER.findByIdAndUpdate(id,body)
    if(userUpdate)
    {
      return {
        message: 'Successfully update user',
        success: true,
      }
  
    }
    return {
      message: 'Fail update user',
      success: false,
    }
  } catch (error) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

const verifyUser = async (email, password,otp) => {
  try {
    const user = await USER.findOne({ email: email })
    
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password)
      if (!isPasswordMatch) {
        return {
          message: 'Invalid password !!',
          success: false
        }
      }
      if (user.otp === otp) {
        user.isVerify = true
        await user.save()
        const generateToken=jwtServices.createToken(user._id)
    
        return {
          message: 'Email Confirm',
          success: true,
          data:{
            token:generateToken
          }
        }

      }
      return {
        message: 'OTP Invalid',
        success: false
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

const sendMail = (email, otp) => {
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
    html: `Your OTP is ${otp}`
  }
  transport.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.log(err)
    } else {
      console.log('Message sent')
    }
  })
}

const generateOTP = () => {
  return Math.floor(Math.random() * 1000000)+"";
}

const getAllUsers = async () => {
  try {
    const users = await USER.find({})
    return {
      message: 'Successfully get all users',
      success: true,
      data: users
    }
  } catch (error) {
    return {
      message: 'An error occurred',
      success: false
    }
  }
}

module.exports = {
  register,
  login,
  getAuth,
  changePassword,
  getProfile,
  updateUserProfile,
  verifyUser,
  getAllUsers,
  loginAdmin
}