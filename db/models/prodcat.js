'use strict'

const {STRING, TEXT} = require('sequelize')

module.exports = db => db.define('productcategories')

module.exports.associations = (ProductCategory, {Category, Product}) => {
  ProductCategory.belongsTo(Category)
  ProductCategory.belongsTo(Product)
}
