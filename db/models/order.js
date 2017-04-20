'use strict'

const {STRING, DECIMAL, INTEGER, BOOLEAN} = require('sequelize')

module.exports = db => db.define('orders', {
  //specify what can be null and what cant
  totalPrice: {
    type: DECIMAL,
    defaultValue: 0.0
  },
  address: {
    type: STRING,
  },
  addressLine2: {
    type: STRING,
  },
  //validations
  city: {
    type: STRING,
  },
  //validations
  state: {
    type: STRING,
  },
  zip: {
    type: INTEGER,  //make string
  },
  phone: {
    type: STRING,
  },
  completed: {
    type: BOOLEAN,
    defaultValue: false,
  }
}, {
  hooks: {
    beforeCreate: formatPhoneNumer,
  }
})

//good! What else might we wanted to format?
function formatPhoneNumer(order) {
  if (order.phone) {
    console.log('user phone', order.phone) //avoid commiting log statements
    let formatted = ''
    for (let i = 0; i < order.phone.length; i++) {
      if (typeof (+order.phone[i]) === 'number') {
        formatted+=order.phone[i]
      }
    }
    return formatted
  }
}

module.exports.associations = (Order, {ProductDetail, User}) => {
  Order.hasMany(ProductDetail)
  Order.belongsTo(User)
}
