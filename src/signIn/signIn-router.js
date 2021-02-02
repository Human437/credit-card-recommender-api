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
  .post(jsonParser,(req,res,next) => {
    const knexInstance = req.app.get('db')
    const {email, hashedPassword:hashedpassword, userCards:usercards,msg} = req.body
    const newUser = {email, hashedpassword,usercards,msg}
    for (const [key, value] of Object.entries(newUser))
    if (value == null)
    return res.status(400).json({
        error: { message: `Missing '${key}' in request body` }
    })
    SignInService.insertUser(knexInstance,newUser)
      .then(user => {
        res
          .status(201)
          .json(serializeUser(user))
      })
      .catch(next)
  })

  module.exports = signInRouter