'use strict'
//delete me
const {STRING} = require('sequelize')

module.exports = db => db.define('favorites')

module.exports.associations = (Favorite, {Thing, User}) => {
  Favorite.belongsTo(Thing)  //I think you deleted these already
  Favorite.belongsTo(User)
}
