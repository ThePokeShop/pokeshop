const Sequelize = require('sequelize')
const db = require('../db')

const EmailToken = db.define('emailToken', {
  emailToken: {
    type: Sequelize.STRING,
    allowNull: false
  },
  wasVerified: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = EmailToken;
