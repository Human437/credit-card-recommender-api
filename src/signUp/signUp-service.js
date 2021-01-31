const SignUpService = {
  insertUser(knex,user){
    return knex
      .insert(email)
      .into('credit-card-reommender-users')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  }
}

module.exports = SignUpService