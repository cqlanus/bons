'use strict'

const {STRING, DECIMAL, INTEGER, BOOLEAN} = require('sequelize')

module.exports = db => db.define('payments', {
  type: {
    type: STRING,
    allowNull: false
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  creditnumber: {
    type: STRING,
    allowNull: false
  },
  expiration: {
    type: STRING,
    allowNull: false
  },
  securitycode: {
    type: STRING,
    allowNull: false
  },
  zip: {
    type: STRING,
    allowNull: false
  }
  
})



module.exports.associations = (Payment, {User}) => {
  Payment.belongsTo(User)
}
