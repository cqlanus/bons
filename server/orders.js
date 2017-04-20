'use strict'

const db = require('APP/db')
const Order = db.model('orders')
const ProductDetail = db.model('productDetails')
const Product = db.model('products')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    (req, res, next) =>
      Order.findAll({
        include: [{model: ProductDetail,
          include: [{model: Product}]
        }]
      })
        .then(orders => res.json(orders))
        .catch(next))
  .post('/',
    (req, res, next) =>
      Order.create(req.body)
      .then(order => {
        console.log('CREATED ORDER', order)
        res.status(201).json(order)
      })
      .catch(next))
  .get('/:id',
    // mustBeLoggedIn,
    (req, res, next) =>
      Order.findById(req.params.id)
      .then(order => res.json(order))
      .catch(next))
