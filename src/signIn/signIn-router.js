const express = require('express')
const xss = require('xss')
const SignInService = require('./signIn-service')
const path = require('path')

const signInRouter = express.Router()
const jsonParser = express.json()

const serializeUser = signIn => ({
  id: signIn.id,
  email: signIn.email,
  hashedPassword: signIn.hashedpassword,
  userCards: signIn.usercards,
  msg: signIn.msg
})

signInRouter
  .route('/')
  .get(jsonParser,(req,res,next) => {
    const knexInstance = req.app.get('db')
    SignInService.getUserByEmail(knexInstance,req.body.email)
      .then(user =>{
        res.json(serializeUser(user))
      })
      .catch(error => next(error))
  })

  module.exports = signInRouter