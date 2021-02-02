const express = require('express')
const xss = require('xss')
const ArticlesService = require('./articles-service')
const path = require('path')

const articlesRouter = express.Router()
const jsonParser = express.json()

const serializeArticle = article => ({
  id: article.id,
  title: xss(article.title),
  content: xss(article.content)
})

articlesRouter
  .route('/')
  .get((req,res,next) => {
    const knexInstance = req.app.get('db')
    ArticlesService.getAllArticles(knexInstance)
      .then(articles => {
        res.json(articles.map(serializeArticle))
      })
      .catch(error => next(error))
  })

articlesRouter
  .route('/:articleId')
  .all((req, res, next) => {
    ArticlesService.getArticleById(
      req.app.get('db'),
      req.params.articleId
    )
      .then(article => {
        if (!article) {
          return res.status(404).json({
            error: { message: `Article doesn't exist` }
          })
        }
        res.article = article
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeArticle(res.article))
  })

module.exports = articlesRouter