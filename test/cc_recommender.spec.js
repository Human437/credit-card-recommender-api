const app = require('../src/app')
const knex = require('knex')
const fixtures = require('./cc_recommender-fixtures')
const supertest = require('supertest')
const { expect } = require('chai')

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

  describe('GET /api/articles/:articleId', () => {
    context('Given no article', () => {
      it(`responds 404 when article doesn't exist`, () => {
        return supertest(app)
          .get(`/api/articles/123`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(404, {
            error: { message: `Article doesn't exist` }
          })
      })
    })

    context('Given there are articles in the database', () => {
      const testArticles = fixtures.makeArticlesArray()

      beforeEach('insert articles', () => {
        return db
          .into('articles')
          .insert(testArticles)
      })

      it('responds with 200 and the specified article', () => {
        const articleId = 2
        const expectedArticle = testArticles[articleId - 1]
        return supertest(app)
          .get(`/api/articles/${articleId}`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(200, expectedArticle)
      })
    })

  })

  describe('GET /api/cards', () => {
    context(`Given no cards`,() => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/cards')
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(200,[])
      })
    })
  
    context('Given there are cards in the database', () => {
      const testCards = fixtures.makeAvailableCardsArray()
  
      beforeEach('insert cards', () => {
        return db
          .into('available_cards')
          .insert(testCards)
      })
  
      it('gets the cards from the store', () => {
        return supertest(app)
          .get('/api/cards')
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(200,testCards)
      })
    })
  })

  describe('GET /api/cards/:cardId', () => {
    context('Given no card', () => {
      it(`responds 404 when card doesn't exist`, () => {
        return supertest(app)
          .get(`/api/cards/123`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(404, {
            error: { message: `Card doesn't exist` }
          })
      })
    })
  
    context('Given there are cards in the database', () => {
      const testCards = fixtures.makeAvailableCardsArray()
  
      beforeEach('insert cards', () => {
        return db
          .into('available_cards')
          .insert(testCards)
      })
  
      it('responds with 200 and the specified card', () => {
        const cardId = 2
        const expectedCard = testCards[cardId - 1]
        return supertest(app)
          .get(`/api/cards/${cardId}`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(200, expectedCard)
      })
    })
  })

  describe('GET /api/users', () => {
    context(`Given no users`,() => {
      it(`responds with 400 when email is not provided`, () => {
        return supertest(app)
          .get('/api/users')
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(400,{error: { message: `Missing email in request body` }})
      })
    })
  
    context('Given there are users in the database', () => {
      const testUsers = fixtures.makeUsersArray()
  
      beforeEach('insert users', () => {
        return db
          .into('users')
          .insert(testUsers)
      })
  
      it('gets the specified user by email from the store', () => {
        return supertest(app)
          .get('/api/users')
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .send({
            email:testUsers[0].email
          })
          .expect(200,testUsers[0])
      })
    })
  })

  describe('GET /api/users/:userId', () => {
    context('Given no user', () => {
      it(`responds 404 when user doesn't exist`, () => {
        return supertest(app)
          .get(`/api/users/123`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(404, {
            error: { message: `User doesn't exist` }
          })
      })
    })
  
    context('Given there are users in the database', () => {
      const testUsers = fixtures.makeUsersArray()
  
      beforeEach('insert users', () => {
        return db
          .into('users')
          .insert(testUsers)
      })
  
      it('responds with 200 and the specified user', () => {
        const userId = 2
        const expectedUser = testUsers[userId - 1]
        return supertest(app)
          .get(`/api/users/${userId}`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(200, expectedUser)
      })
    })
  
  })

  describe('POST /api/users', () => {
    it(`responds with 400 missing 'email' if not supplied`, () => {
      const newUser ={
        // email:"5hwpyxoutfugfqbusvz@twzhhq.com",
        hashedPassword:"$2a$10$52IFOba30w8yQUEF3wfqPOy3hq31ujasIr0cQu6RFcD0GURuZE4wi",
        userCards:"[5,6]",
        // Only use unhashedPassword for testing purposes
        // unhashedPassword: aB3!bnmv
        msg:""
      }
      return supertest(app)
        .post(`/api/users`)
        .send(newUser)
        .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
        .expect(400, {error: { message: `Missing 'email' in request body` }})
    })

    it(`responds with 400 missing 'hashedpassword' if not supplied`, () => {
      const newUser ={
        email:"5hwpyxoutfugfqbusvz@twzhhq.com",
        // hashedPassword:"$2a$10$52IFOba30w8yQUEF3wfqPOy3hq31ujasIr0cQu6RFcD0GURuZE4wi",
        userCards:"[5,6]",
        // Only use unhashedPassword for testing purposes
        // unhashedPassword: aB3!bnmv
        msg:""
      }
      return supertest(app)
        .post(`/api/users`)
        .send(newUser)
        .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
        .expect(400, {error: { message: `Missing 'hashedpassword' in request body` }})
    })

    it(`responds with 400 missing 'usercards' if not supplied`, () => {
      const newUser ={
        email:"5hwpyxoutfugfqbusvz@twzhhq.com",
        hashedPassword:"$2a$10$52IFOba30w8yQUEF3wfqPOy3hq31ujasIr0cQu6RFcD0GURuZE4wi",
        // userCards:"[5,6]",
        // Only use unhashedPassword for testing purposes
        // unhashedPassword: aB3!bnmv
        msg:""
      }
      return supertest(app)
        .post(`/api/users`)
        .send(newUser)
        .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
        .expect(400, {error: { message: `Missing 'usercards' in request body` }})
    })

    it(`responds with 400 missing 'msg' if not supplied`, () => {
      const newUser ={
        email:"5hwpyxoutfugfqbusvz@twzhhq.com",
        hashedPassword:"$2a$10$52IFOba30w8yQUEF3wfqPOy3hq31ujasIr0cQu6RFcD0GURuZE4wi",
        userCards:"[5,6]",
        // Only use unhashedPassword for testing purposes
        // unhashedPassword: aB3!bnmv
        // msg:""
      }
      return supertest(app)
        .post(`/api/users`)
        .send(newUser)
        .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
        .expect(400, {error: { message: `Missing 'msg' in request body` }})
    })

    it(`adds a new user to the db`, () => {
      const newUser ={
        email:"5hwpyxoutfugfqbusvz@twzhhq.com",
        hashedPassword:"$2a$10$52IFOba30w8yQUEF3wfqPOy3hq31ujasIr0cQu6RFcD0GURuZE4wi",
        userCards:"[5,6]",
        // Only use unhashedPassword for testing purposes
        // unhashedPassword: aB3!bnmv
        msg:"Test msg"
      }
      return supertest(app)
        .post(`/api/users`)
        .send(newUser)
        .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
        .expect(201)
        .expect(res => {
          expect(res.body.email).to.eql(newUser.email)
          expect(res.body.hashedpassowrd).to.eql(newUser.hashedPassowrd)
          expect(res.body.usercards).to.eql(newUser.userCards)
          expect(res.body.msg).to.eql(newUser.msg)
        })
        .then(res => 
          //Using get user by id end point to check that an id is successfully made
          //It is known that the get user by id endpoint already works due to previous tests
          supertest(app)
            .get(`/api/users/${res.body.id}`)  
            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
            .expect(res.body)
        )
    })
  })

  describe(`PATCH /api/users`, () => {
    context(`Given no user`, () => {
      it(`responds with 404 when a specified user doesn't exist`, () => {
        const updatedUser = {
          id: 12345,
          userCards: `[1,2]`,
          msg:`updated msg`
        }
        return supertest(app)
          .patch(`/api/users`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .send(updatedUser)
          .expect(404,{error: {message: `User doesn't exist`}})
      })
    })
    context(`Given there are users in the db`, () => {
      const testUsers = fixtures.makeUsersArray()
      beforeEach('insert users', () => {
        return db
          .into('users')
          .insert(testUsers)
      })

      it(`responds with 204 and updates the db`, () => {
        const updatedUser = {
          id: 1,
          usercards: `[1,2]`,
          msg:`updated msg`
        }
        const expectedUser = {
          ...testUsers[updatedUser.id-1],
          ...updatedUser
        }
        return supertest(app)
          .patch(`/api/users`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .send(updatedUser)
          .expect(204)
          .then(res => 
            supertest(app)
              .get(`/api/users/${updatedUser.id}`)
              .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
              .expect(expectedUser)
          )
      })
    })
  })
})