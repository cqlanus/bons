'use strict'

const {STRING, DECIMAL} = require('sequelize')

module.exports = db => db.define('product', {
  name: {
    type: STRING,
    allowNull: false
  },
  img: {
    type: STRING,
  },
  unitPrice: {
    type: DECIMAL,
    defaultValue: 0.01,
  }
})

module.exports.associations = (Product, {ProductDetail, Comment, Rating}) => {
  Product.hasMany(ProductDetail)
  Product.hasMany(Comment)
  Product.hasMany(Rating)
}
