const Sequelize = require('sequelize');
const db = require('../db');


const LineItem = db.define('lineItem', {
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  }
})
module.exports = LineItem;
