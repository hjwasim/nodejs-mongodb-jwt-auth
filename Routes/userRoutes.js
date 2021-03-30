const User = require('../Models/User')

const router = require('express').Router()

router.get('/get/users',(req,res) => {
    User.find({},(err,users) => {
        return  res.json(users)
    })
   
})

module.exports = router