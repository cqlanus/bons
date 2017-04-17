'use strict'

const {STRING, INTEGER} = require('sequelize')

module.exports = db => db.define('ratings', {
  rating: {
    type: INTEGER,
    allowNull: false,
  }
})

module.exports.associations = (Rating, {Product, User}) => {
  Rating.belongsTo(Product)
  Rating.belongsTo(User)
}
