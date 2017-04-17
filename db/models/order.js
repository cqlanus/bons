'use strict'

const {STRING, FLOAT} = require('sequelize')

module.exports = db => db.define('order', {
  totalPrice: {
    type: FLOAT,
    allowNull: false
  }
})

module.exports.associations = (Order, {ProductDetail, User}) => {
  Order.hasMany(ProductDetail)
  Order.belongsTo(User)
}
