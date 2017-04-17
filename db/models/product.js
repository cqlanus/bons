'use strict'

const {STRING, DECIMAL} = require('sequelize')

module.exports = db => db.define('products', {
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

module.exports.associations = (Product, {ProductDetail, Comment, Rating, Category}) => {
  Product.hasMany(ProductDetail)
  Product.hasMany(Comment)
  Product.hasMany(Rating)
  Product.belongsToMany(Category, {through: 'product_categories'})
}
