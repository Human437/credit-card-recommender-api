const app = require('../src/app')
const knex = require('knex')
const fixtures = require('./cc_recommender-fixtures')

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

  afterEach('cleanup', () => db('users').truncate())

  describe(`Unauthorized requests`, () => {
    const testUsers = fixtures.makeUsersArray()
    const testCards = fixtures.makeAvailableCardsArray()
    const testArticles = fixtures.makeArticlesArray()

    beforeEach('insert Users', () => {
      return db
        .into('users')
        .insert(testUsers)
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
})