const USER = require("../models/User")
const bcrypt = require('bcryptjs')

const register = async (body) => {
  try {
    const { email, username } = body
    console.log("body", body)
    console.log(email)
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
    sendMail(email, username)
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

const sendMail = (email, username) => {
  let transport = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'holmesz17@outlook.com',
      pass: 'phamtandat1712'
    }
  })

  let mailOptions
  mailOptions = {
    from: 'holmesz17@outlook.com',
    to: email,
    subject: 'Email confirmation',
    html: `Press <a href=http://localhost:5000/verify/${username}> here </a> to verify your email.`
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
  login
}