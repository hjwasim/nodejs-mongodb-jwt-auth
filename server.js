const express = require('express')
const app = express()
const authRoutes = require('./Routes/authRoutes')
const mongoose = require('mongoose')
const morgan = require('morgan')
const userRoutes = require('./Routes/userRoutes')
const authJWT = require('./helpers/jwt')



require('dotenv').config()

//Middlewares

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/auth',authRoutes)
app.use('/',authJWT,userRoutes)

//MongoDB Connect
mongoose.connect(require('./db/db.config').uri,{useNewUrlParser: true,useUnifiedTopology: true},(err) => {
    if(err) { 
        console.log("Sorry, Mongodb Not Connected!!");
    } else {
        console.log("Success, Mongodb Connected!!");
    }
})


app.listen(3000,() => {
    console.log("Server Started on http://localhost:3000");
})