'use strict'

const {STRING, INTEGER, DECIMAL} = require('sequelize')

module.exports = db => db.define('productDetails', {
  quantity: {
    type: INTEGER,
    // allowNull: false,
    defaultValue: 1,
  },
  price: {
    type: DECIMAL,
  }
}, {
  setterMethods: {
    setPrice: function(price) {
      return this.setDataValue('price', price)
    }
  },
  instanceMethods: {
    getTotalOrderPrice() {
      return this.getOrder()
      .then(order => {
        return order.calculateTotalPrice()
      })
      .then(order => {
        return this
      })
    },
    calculateProdDetPrice() {
      return this.getProduct()
      .then(product => {
        const price = this.quantity * product.getDataValue('unitPrice')
        this.setDataValue('price', price)
        this.save()
        return this
      })
      .catch(console.log)
    }
  }
})

module.exports.associations = (ProductDetail, {Product, Order}) => {
  ProductDetail.belongsTo(Product)
  ProductDetail.belongsTo(Order)
}
