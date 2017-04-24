'use strict'

const db = require('APP/db')
const User = db.model('users')
const Order = db.model('orders')
const ProductDetail = db.model('productDetails')
const Product = db.model('products')
const Comment = db.model('comments')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    (req, res, next) =>
      User.findAll({
        include: [{model: Order,
          include: [{model: ProductDetail,
            include: [{model: Product}]
          }]
        }, {model: Comment}]
      })
        .then(users => res.json(users))
        .catch(next))
  .post('/',
    (req, res, next) =>
      User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next))
  .get('/:id',
    //mustBeLoggedIn,
    (req, res, next) =>
      User.findById(req.params.id, {
        include: [{model: Order,
          include: [{model: ProductDetail,
            include: [{model: Product}]
          }]
        }, {model: Comment,
          include: [Product]
        }]
      })
      .then(user => res.json(user))
      .catch(next))
    .put('/:id',
       (req, res, next) =>
      User.update(req.body, {
        where: {id: req.params.id}
      })
      .then(user => res.json(user))
      .catch(next)
    )
