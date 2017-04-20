'use strict'

const {STRING, DECIMAL} = require('sequelize')

module.exports = db => db.define('orders', {
  totalPrice: {
    type: DECIMAL,
    defaultValue: 0.0
  }
})

module.exports.associations = (Order, {ProductDetail, User}) => {
  Order.hasMany(ProductDetail)
  Order.belongsTo(User)
}
