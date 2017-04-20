'use strict'

const db = require('APP/db')
const Order = db.model('orders')
const ProductDetail = db.model('productDetails')
const Product = db.model('products')
const User = db.model('users')

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
        res.status(201).json(order)
      })
      .catch(next))

/// PUT ROUTE WILL USE ORDER ID
  .put('/:id',
    (req, res, next) => {
      console.log('PUT ORDER REQ.BODY', req.body)
      Order.findById(req.params.id)
      .then(foundOrder => {
        foundOrder.update(req.body)
      })
      .then(updatedOrder => {
        res.status(201).json(updatedOrder)
      })
      .catch(next)
    })

  .get('/:id',
    // mustBeLoggedIn,
    (req, res, next) =>
      // Order.findById(req.params.id)
      // .then(order => res.json(order))
      // .catch(next))

      Order.findById(req.params.id, {
        include: [{model: User}, {model: ProductDetail,
          include: [{model: Product}]
        }]
      })
      .then(order => res.json(order))
      .catch(next))
