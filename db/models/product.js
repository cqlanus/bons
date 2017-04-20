'use strict'

const {STRING, DECIMAL} = require('sequelize')

module.exports = db => db.define('products', {
  name: {
    type: STRING,
    allowNull: false
  },
  //nullable?
  img: {//is this a URL to an image? Make this name clear
    type: STRING,
  },
  //nullable?
  unitPrice: {
    type: DECIMAL,
    defaultValue: 0.01,
  }
})

module.exports.associations = (Product, {ProductDetail, Comment, Rating, Category}) => {
  Product.hasMany(ProductDetail)
  Product.hasMany(Comment)
  Product.hasMany(Rating)
  Product.belongsToMany(Category, {through: 'ProductCategory'})
}
