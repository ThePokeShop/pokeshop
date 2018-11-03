const Sequelize = require('sequelize');
const db = require('../db');


const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('active', 'created', 'shipped', 'cancelled', 'delivered'),
    allowNull: false,
    defaultValue: 'active'
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
