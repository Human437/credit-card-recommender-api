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
  imgLink: xss(card.imglink)
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

module.exports = cardsRouter