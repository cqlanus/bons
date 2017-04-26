'use strict'

const db = require('APP/db')
const User = db.model('users')
const Payment = db.model('payments')
const Order = db.model('orders')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  
  .get('/',
    (req, res, next) =>
      Payment.findAll()
        .then(payments => res.json(payments))
        .catch(next))

  .post('/',
    (req, res, next) =>
      Payment.create(req.body)// CHANGE TO FIND OR CREATE
      .then(payment => { 
        Order.findById(req.body.orderId)
        .then(order=>{
          order.setPayment(payment.id)
        })
        .then(()=>{
          res.status(200).json(payment)
        })
      })
      .catch(next))

/// PUT ROUTE WILL USE ORDER ID
  .put('/:id',
    (req, res, next) => {
      Payment.findById(req.params.id)
      .then(foundPayment => {
        foundPayment.update(req.body)
      })
      .then(updatedPayment => {
        res.status(200).json(updatedPayment)
      })
      .catch(next)
    })

  .get('/:id',
    // mustBeLoggedIn,
    (req, res, next) =>
      Payment.findById(req.params.id)
      .then(payment => res.json(payment))
      .catch(next))


  .get('/paymentProfile/:userId',
    (req, res, next) =>
      Payment.findAll({
        where: {user_id: req.params.userId}
      })
      .then(profile => res.json(profile))
      .catch(next))