
const Sequelize = require('sequelize')
const db = require('../db')


const Category = db.define('category', {
  categoryType: {
    type: Sequelize.ENUM('Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground',
      'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon')
  }
})


module.exports = Category
