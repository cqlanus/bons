'use strict'

const {STRING, DECIMAL, INTEGER, BOOLEAN} = require('sequelize')

module.exports = db => db.define('orders', {
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
  city: {
    type: STRING,
  },
  state: {
    type: STRING,
  },
  zip: {
    type: INTEGER,
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

function formatPhoneNumer(order) {
  if (order.phone) {
    console.log('user phone', order.phone)
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
