const express = require('express')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const auth = require('../middleware/auth')
const { route } = require('./productRoute')
const JWT_KEY = process.env.JWT_KEY

const router = express.Router()

router.post('/user/register', async (req, res) => {
    // Create a new user
    const user = new User(req.body)

    //check if email is already in the database
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send('Email already exist !!')

    //check if username is already in the database
    const usernameExist = await User.findOne({ username: req.body.username })
    if (usernameExist) return res.status(400).send('Username already exist !!')



    try {
        await user.save()
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            JWT_KEY
        )
        res.status(201).send({ user, token })
    } catch (error) {
        return res.status(400).send(error)
    }
})

router.post('/user/login', async (req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email }).lean()
        if (!user) {
            return res.json({ status: 'error', error: 'Invalid email !!' })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.json({ status: 'error', error: 'Invalid password !!' })
        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            JWT_KEY
        )

        return res.send({ user, token })
        //return res.status(200).send('Login success !!')
    } catch (error) {
        res.status(400).send(error)
    }
})




module.exports = router