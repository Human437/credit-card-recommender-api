const app = require('../src/app')
const knex = require('knex')

describe('Credit Card Recommender Endpoints', () => {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  // after('disconnect from db', () => db.destroy())

  // before('cleanup', () => db('cc_recommender_test').truncate())

  // afterEach('cleanup', () => db('cc_recommender_test').truncate())

  describe(`Unauthorized requests`, () => {
    it('responds with 401 Unauthorized for GET /', () => {
      return supertest(app)
        .get('/')
        .expect(401, { error: 'Unauthorized request' })
    })

  })
})