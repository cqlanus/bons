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
      Order.create(req.body)// CHANGE TO FIND OR CREATE
      .then(order => { // IF FOUND, UPDATE W/ REQ.BODY, OTHERWISE CREATE
        console.log('CREATED ORDER', order)
        res.status(201).json(order)
      })
      .catch(next))
  .put('/:id',
    (req, res, next) => {
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
      Order.findById(req.params.id, {
        include: [{model: User}, {model: ProductDetail,
          include: [{model: Product}]
        }]
      })

      .then(order => order.calculateTotalPrice())
      .then(order => res.json(order))
      .catch(next))
