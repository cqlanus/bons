'use strict'

const {STRING, FLOAT} = require('sequelize')

module.exports = db => db.define('orders', {
  totalPrice: {
    type: FLOAT,
    allowNull: false
  }
})

module.exports.associations = (Order, {ProductDetail, User}) => {
  Order.hasMany(ProductDetail)
  Order.belongsTo(User)
}
