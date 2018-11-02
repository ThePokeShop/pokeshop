const Sequelize = require('sequelize');
const db = require('../db');


const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('created', 'active', 'shipped', 'cancelled', 'delivered'),
    validate: {
      defaultValue: 'created'
    }
  },
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: true
  },
  billingAddress: {
    type: Sequelize.STRING,
    allowNull: true
  },
  isLoggedIn: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    validate: {
      defaultValue: false
    }
  }
})
module.exports = Order;
