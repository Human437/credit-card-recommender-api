const CardsService = {
  getAllCards(knex){
    return knex.select('*').from('available_cards')
  },
  getCardById(knex,id){
    return knex.from('available_cards').select('*').where('id',id).first()
  }
}

module.exports = CardsService