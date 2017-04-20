'use strict'

const {STRING, TEXT} = require('sequelize')

module.exports = db => db.define('categories', {
  name: {
    type: TEXT,
    allowNull: false,
  }
})

module.exports.associations = (Category, {Product}) => {
  //Foreign key on the category?
  Category.belongsToMany(Product, {through: 'ProductCategory'})
}
