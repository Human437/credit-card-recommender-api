const app = require('../src/app')
const knex = require('knex')
const fixtures = require('./cc_recommender-fixtures')
const supertest = require('supertest')

describe('Credit Card Recommender Endpoints', () => {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => db('users').truncate())
  before('cleanup', () => db('articles').truncate())
  before('cleanup', () => db('available_cards').truncate())

  afterEach('cleanup', () => db('users').truncate())
  afterEach('cleanup', () => db('articles').truncate())
  afterEach('cleanup', () => db('available_cards').truncate())

  describe(`Unauthorized requests`, () => {
    const testUsers = fixtures.makeUsersArray()
    const testCards = fixtures.makeAvailableCardsArray()
    const testArticles = fixtures.makeArticlesArray()

    beforeEach('insert Users', () => {
      return db
        .into('users')
        .insert(testUsers)
    })

    it('responds with 401 Unauthorized for GET /', () => {
      return supertest(app)
        .get('/')
        .expect(401, { error: 'Unauthorized request' })
    })

    it('responds with 401 Unauthorized for GET /api/cards', () => {
      return supertest(app)
        .get('/api/cards')
        .expect(401, { error: 'Unauthorized request' })
    })

    it('responds with 401 Unauthorized for GET /api/cards/:cardId', () => {
      const secondCard = testCards[1]
      return supertest(app)
        .get(`/api/cards/${secondCard.id}`)
        .expect(401, { error: 'Unauthorized request' })
    })

    it('responds with 401 Unauthorized for GET /api/articles', () => {
      return supertest(app)
        .get('/api/articles')
        .expect(401, { error: 'Unauthorized request' })
    })

    it('responds with 401 Unauthorized for GET /api/articles/:articleId', () => {
      const secondArticle = testArticles[1]
      return supertest(app)
        .get(`/api/articles/${secondArticle.id}`)
        .expect(401, { error: 'Unauthorized request' })
    })

    it('responds with 401 Unauthorized for GET /api/users', () => {
      return supertest(app)
        .get('/api/users')
        .expect(401, { error: 'Unauthorized request' })
    })

    it('responds with 401 Unauthorized for GET /api/users/:userId', () => {
      const secondUser = testUsers[1]
      return supertest(app)
        .get(`/api/users/${secondUser.id}`)
        .expect(401, { error: 'Unauthorized request' })
    })

    it('responds with 401 Unauthorized for POST /api/users', () => {
      return supertest(app)
        .post('/api/users')
        .send({
          email:'testemail@gmail.com',
          hashedPassowrd: 'dfafdafdkasklfdakljfdakl',
          usercards: '[1,2,3]',
          msg: ''
        })
        .expect(401, { error: 'Unauthorized request' })
    })

    it('responds with 401 Unauthorized for POST /api/users', () => {
      return supertest(app)
        .patch('/api/users')
        .send({
          id:1,
          usercards: '[3]',
          msg: 'Test msg'
        })
        .expect(401, { error: 'Unauthorized request' })
    })
  })
  
  describe('GET /api/articles', () => {
    context(`Given no articles`,() => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/articles')
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(200,[])
      })
    })

    context('Given there are articles in the database', () => {
      const testArticles = fixtures.makeArticlesArray()

      beforeEach('insert articles', () => {
        return db
          .into('articles')
          .insert(testArticles)
      })

      it('gets the articles from the store', () => {
        return supertest(app)
          .get('/api/articles')
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(200,testArticles)
      })
    })
  })
})