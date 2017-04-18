'use strict'

const {STRING, TEXT} = require('sequelize')

module.exports = db => db.define('categories', {
  name: {
    type: TEXT,
    allowNull: false,
  }
})

module.exports.associations = (Category, {Product}) => {
  Category.belongsToMany(Product, {through: 'ProductCategory'})
}
