const express = require('express')
const xss = require('xss')
const UserService = require('./userService')
const path = require('path')

const userRouter = express.Router()
const jsonParser = express.json()

const serializeUser = user => ({
  id: user.id,
  email: xss(user.email),
  hashedPassword: xss(user.hashedpassword),
  userCards: user.usercards,
  msg: user.msg
})

userRouter
  .route('/')
  .get(jsonParser,(req,res,next) => {
    const knexInstance = req.app.get('db')
    UserService.getUserByEmail(knexInstance,req.body.email)
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
    UserService.insertUser(knexInstance,newUser)
      .then(user => {
        res
          .status(201)
          .json(serializeUser(user))
      })
      .catch(next)
  })

  .patch(jsonParser,(req,res,next) => {
    const knexInstance = req.app.get('db')
    const {id, userCards:usercards,msg} = req.body
    const userInfoToUpdate = {usercards,msg}

    const numberOfValues = Object.values(userInfoToUpdate).filter(Boolean).length
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'userCards' or 'msg'`
        }
      })
    }

    UserService.updateUser(knexInstance,id,userInfoToUpdate)
    .then(numRowsAffected => {
      res.status(204).end()
    })
    .catch(next)
  })

  module.exports = userRouter