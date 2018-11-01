const Sequelize = require('sequelize');
const db = require('../db');


const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('in progress', 'purchased', 'delivered'),
    validate: {
      defaultValue: 'in progress'
    }
  },
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: true
  },
  billingAddress: {
    type: Sequelize.STRING,
    allowNull: true
  }
})
module.exports = Order;
