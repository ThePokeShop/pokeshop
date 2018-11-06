
const Sequelize = require('sequelize')
const db = require('../db')


const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    }
  },
  stockQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG"
  },
  description:{
    type: Sequelize.TEXT
  },
  visibleToUser:{
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})
module.exports = Product
