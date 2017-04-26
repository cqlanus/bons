'use strict'

const {STRING, DECIMAL, INTEGER, BOOLEAN} = require('sequelize')

module.exports = db => db.define('orders', {
  totalPrice: {
    type: DECIMAL,
    defaultValue: 0.0,
    set: function(price) {
      this.setDataValue('totalPrice', price)
    }
  },
  shipto: {
    type: STRING,
  },
  streetaddress: {
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
  },
  instanceMethods: {
    calculateTotalPrice() {
      return this.getProductDetails()
      .then(prodDets => {
        let total = 0
        prodDets.forEach(prodDet => {
          total += parseFloat(prodDet.price)
        })
        this.setDataValue('totalPrice', total.toFixed(2))
        this.save()
        return this
      })
    }
  }
})

function formatPhoneNumer(order) {
  if (order.phone) {
    let formatted = ''
    for (let i = 0; i < order.phone.length; i++) {
      if (typeof (+order.phone[i]) === 'number') {
        formatted+=order.phone[i]
      }
    }
    return formatted
  }
}

module.exports.associations = (Order, {ProductDetail, User, Payment}) => {
  Order.hasMany(ProductDetail)
  Order.belongsTo(User)
  Order.belongsTo(Payment)
}
