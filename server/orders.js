'use strict'

const db = require('APP/db')
const Order = db.model('orders')
const ProductDetail = db.model('productDetails')
const Product = db.model('products')
const User = db.model('users')

const {mustBeLoggedIn, forbidden} = require('./auth.filters') //Don't unncessarily import things

module.exports = require('express').Router()
  .get('/',
    (req, res, next) =>
      Order.findAll({
        include: [{model: ProductDetail,
          include: [{model: Product}]
        }]
      })
      //formatting
      .then(orders => res.json(orders))
      .catch(next))
  .post('/',
    (req, res, next) =>
      Order.create(req.body)// CHANGE TO FIND OR CREATE  - Why find? Are we going to pass an ID to post? Is that RESTful?
      .then(order => { // IF FOUND, UPDATE W/ REQ.BODY, OTHERWISE CREATE
        console.log('CREATED ORDER', order)
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
        //201 is for created. Send 200
        res.status(201).json(updatedOrder)
      })
      .catch(next)
    })

    //I'd move this route up with the other get route
  .get('/:id',
    // mustBeLoggedIn,
    (req, res, next) =>
      // Order.findById(req.params.id)
      // .then(order => res.json(order))
      // .catch(next))

      Order.findById(req.params.id, {
        //Orders always need users? Also, note the format difference here vs all orders
        include: [{model: User}, {model: ProductDetail,
          include: [{model: Product}]
        }]
      })
      .then(order => res.json(order))
      .catch(next))
