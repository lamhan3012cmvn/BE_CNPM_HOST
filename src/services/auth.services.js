const USER = require("../models/User")
const bcrypt = require('bcryptjs')

const register = async (body) => {
  try {
    console.log("body", body)
    //check if email is already in the database
    const emailExist = await USER.findOne({
      email: body.email
    })
    if (emailExist) return {
      message: 'Email already exist !!',
      success: false
    }

    //check if username is already in the database
    const usernameExist = await USER.findOne({
      username: body.username
    })
    if (usernameExist) return {
      message: 'Username already exist !!',
      success: false
    }

    const hashedPassword = await bcrypt.hash(body.password, 16);


    const newUser = new USER({
      ...body,
      password: hashedPassword
    })


    console.log("save")
    await newUser.save()
    return {
      message: 'Successfully registered',
      success: true,
      data: createdUser
    };

  } catch (err) {
    return {
      message: 'An error occured',
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
      message: 'An error occured',
      success: false
    }
  }
}

module.exports = {
  register,
  login
}