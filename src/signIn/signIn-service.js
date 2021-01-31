const SignInService = {
  getUserByEmail(knex,email){
    return knex.select('password').where('email',email).first()
  }
}

module.exports = SignInService