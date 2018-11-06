const Sequelize = require('sequelize');
const db = require('../db');


const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
    allowNull:true
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
        min: 1,
        max: 5
    }
  }
})
module.exports = Review;
