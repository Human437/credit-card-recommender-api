const express = require('express')
const xss = require('xss')
const CardsService = require('./cards-service')
const path = require('path')

const cardsRouter = express.Router()
const jsonParser = express.json()

const serializeCards = card => ({
  id: card.id,
  title: xss(card.title),
  content: xss(card.content),
  imglink: xss(card.imglink)
})

cardsRouter
  .route('/')
  .get((req,res,next) => {
    const knexInstance = req.app.get('db')
    CardsService.getAllCards(knexInstance)
      .then(cards => {
        res.json(cards.map(serializeCards))
      })
      .catch(error => next(error))
  })

cardsRouter
  .route('/:cardId')
  .all((req,res,next) => {
    const knexInstance = req.app.get('db')
    CardsService.getCardById(knexInstance,req.params.cardId)
      .then(card => {
        if(!card){
          return res.status(404).json({
            error: {message: `Card doesn't exist`}
          })
        }
        res.card = card
        next()
      })
      .catch(next)
  })
  .get((req,res,next) => {
    res.json(serializeCards(res.card))
  })

module.exports = cardsRouter