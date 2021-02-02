const UserService = {
  getUserByEmail(knex,email){
    return knex.from('users').select('*').where('email',email).first()
  },
  insertUser(knex,user){
    return knex
      .insert(user)
      .into('users')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  updateUser(knex,id,newUserFields){
    return knex('users')
      .where({id})
      .update(newUserFields)
  }
}

module.exports = UserService