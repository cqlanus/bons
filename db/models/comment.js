'use strict'

const {STRING, TEXT} = require('sequelize')

module.exports = db => db.define('comment', {
  comment: {
    type: TEXT,
    allowNull: false,
  }
})

module.exports.associations = (Comment, {Product, User}) => {
  Comment.belongsTo(Product)
  Comment.belongsTo(User)
}
