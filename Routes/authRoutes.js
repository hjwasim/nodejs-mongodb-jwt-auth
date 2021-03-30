const router = require('express').Router()
const User = require('../Models/User')
const bcrypt = require('bcrypt')
const { response } = require('express')
const jwt = require('jsonwebtoken')


router.get('/', (req, res) => {
    res.status(200).send("Hii!! This is JWT Authentication using Nodejs.")
})

router.post('/signup', (req, res) => {
    console.log(req.body);
    if (req.body) {
        User.findOne({ username: req.body.username }, (err, user) => {
            if (!user) {
                User.findOne({ email: req.body.email }, (err, result) => {
                    if (!result) {
                        User.create({ ...req.body, passwordHash: bcrypt.hashSync(req.body.password, 10) })
                            .then(user => {
                                return res.status(201).json(user)
                            })
                            .catch(err => {
                                return res.status(400).send(err)
                            })
                    }
                    else {
                        return res.status(400).json({ msg: "Email already exists!!" })
                    }
                })
            } else {
                return res.status(400).json({ msg: "Username already exists!!" })
            }
        })
    }
})

router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        const secret =  process.env.SECRET
        if (!user) {
            return res.status(400).json({ msg: "Username is Wrong" })
        }
        if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
            const token = jwt.sign({
                username: user.username
            },secret,
                {
                    expiresIn: '1d'
                })
            return res.status(200).json({ token: token })
        } else {
            return res.status(400).json({ msg: "Password is Wrong" })
        }
    })

})

module.exports = router