const express = require('express')
const xss = require('xss')
const UserService = require('./userService')

const userRouter = express.Router()
const jsonParser = express.json()

const serializeUser = user => ({
  id: user.id,
  email: xss(user.email),
  hashedpassword: xss(user.hashedpassword),
  usercards: user.usercards,
  msg: user.msg
})

userRouter
  .route('/')
  .get(jsonParser,(req,res,next) => {
    const knexInstance = req.app.get('db')
    const email = req.query.email
    if (typeof email === 'undefined'){
      return res.status(400).json({
        error: { message: `Missing email in request query` }
      })
    }
    UserService.getUserByEmail(knexInstance,email)
      .then(user =>{
        if(typeof user === 'undefined'){
          return res.status(404).json({
            error: { message: `The email provided is not associated with any account` }
          })
        }
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

userRouter
  .route('/:userId')
  .all((req,res,next) => {
    UserService.getUserById(
      req.app.get('db'),
      req.params.userId
    )
      .then(user => {
        if(!user){
          return res.status(404).json({
            error: {message: `User doesn't exist`}
          })
        }
        res.user = user
        next()
      })
      .catch(next)
  })
  .get((req,res,next) => {
    res.json(serializeUser(res.user))
  })
  .patch(jsonParser,(req,res,next) => {
    const knexInstance = req.app.get('db')
    const {usercards:usercards,msg} = req.body
    const userInfoToUpdate = {usercards,msg}
    const id = req.params.userId
    console.log(req.body)

    if (typeof usercards === 'undefined' && typeof msg === 'undefined') {
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'usercards' or 'msg'`
        }
      })
    }
    UserService.updateUser(knexInstance,id,userInfoToUpdate)
      .then(numRowsAffected => {
        console.log('success')
        res.status(204).end()
      })
      .catch(next)
  })

  module.exports = userRouter