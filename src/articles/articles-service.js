const ArticlesService = {
  getAllArticles(knex){
    return knex.select('*').from('articles')
  },
  getArticleById(knex,id){
    return knex.from('articles').select('*').where('id',id).first()
  }
}

module.exports = ArticlesService