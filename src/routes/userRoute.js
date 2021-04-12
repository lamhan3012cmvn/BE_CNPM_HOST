const express = require('express')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const auth = require('../middleware/auth')

const JWT_KEY = process.env.JWT_KEY

const router = express.Router()

router.post('/register', async (req, res) => {
    // Create a new user
    const user = new User(req.body)

    //check if email is already in the database
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send('Email already exist !!')

    //check if username is already in the database
    const usernameExist = await User.findOne({ username: req.body.username })
    if (usernameExist) return res.status(400).send('Username already exist !!')

    //check dateOfBirth is smaller than now and age smaller than 160
    const checkDateOfBirth = await User.findOne({ dateOfBirth: req.body.dateOfBirth })
    if (checkDateOfBirth >= Date.now || (Date.now - checkDateOfBirth) >= 160) return res.status(400).send('DoB must smaller than now and age must smaller than 160 year !!')

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

router.post('/login', async (req, res) => {
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

router.post('/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.put('/update/:id', auth, async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId)
        if (user) {
            user.username = req.body.username || user.username
            user.email = req.body.email || user.email
            user.fullName = req.body.fullName || user.fullName
            user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth
            user.identityCard = req.body.identityCard || user.identityCard
            user.password = req.body.password || user.password
            const updateUser = await user.save()
            const token = jwt.sign(
                {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin,
                },
                JWT_KEY
            )
            res.status(200).send({
                _id = updateUser.id,
                username = updateUser.username,
                email = updateUser.email,
                fullName = updateUser.fullName,
                dateOfBirth = updateUser.dateOfBirth,
                identityCard = updateUser.identityCard,
                isAdmin = updateUser.isAdmin,
                token = token
            })
        } else {
            res.status(404).send({ message: 'User not found !!' })
        }

    } catch (error) {
        res.status(500).send(error)
    }

})
router.post('/change-password', (res, req) => {
    const { token } = req.body
    const user = jwt.verify(token, JWT_KEY)


})

module.exports = router