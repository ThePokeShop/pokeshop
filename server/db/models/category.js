
const Sequelize = require('sequelize')
const db = require('../db')


const Category = db.define('category', {
  categoryType: {
    type: Sequelize.ENUM('normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground',
      'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon')
  }
})


module.exports = Category
