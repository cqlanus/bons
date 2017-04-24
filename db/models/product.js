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
  },
  description: {
    type: STRING,
  }
})

module.exports.associations = (Product, {ProductDetail, Comment, Rating, Category, User}) => {
  Product.hasMany(ProductDetail)
  Product.hasMany(Comment)
  Product.hasMany(Rating)
  Product.belongsTo(User)
  Product.belongsToMany(Category, {through: 'ProductCategory'})
}
