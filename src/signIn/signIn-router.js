const express = require('express')
const xss = require('xss')
const SignInService = require('./signIn-service')
const path = require('path')

const signInRouter = express.Router()
const jsonParser = express.json()

const serializeSignIn = signIn => ({
  email: signIn.email,
  passwordHash: signIn.passwordHash
})

signInRouter
  .route('/')
  .get((req,res,next) => {
    const knexInstance = req.app.get('db')
    SignInService.getUserByEmail(knexInstance,req.body.email)
      .then(user =>{
        res.json(user.map(serializeSignIn))
      })
      .catch(error => next(error))
  })