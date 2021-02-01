const SignInService = {
  getUserByEmail(knex,email){
    return knex.from('users').select('*').where('email',email).first()
  }
}

module.exports = SignInService