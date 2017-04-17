'use strict'

const {STRING, INTEGER, DECIMAL} = require('sequelize')

module.exports = db => db.define('productDetails', {
  quantity: {
    type: INTEGER,
    allowNull: false,
  },
  price: {
    type: DECIMAL,
    allowNull: false,
  }
})

module.exports.associations = (ProductDetail, {Product, Order}) => {
  ProductDetail.belongsTo(Product)
  ProductDetail.belongsTo(Order)
}
