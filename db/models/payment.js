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
  
}, {
getterMethods: {
  getPaymentProfileName() {
    let endNum = this.creditnumber.slice(-4);
    return this.name+endNum
}}}

)



module.exports.associations = (Payment, {User, Order}) => {
  Payment.belongsTo(User)
  Payment.hasMany(Order)
}
