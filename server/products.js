'use strict'

const db = require('APP/db')
const Product = db.model('products')
const Rating = db.model('ratings')
const Comment = db.model('comments')
const User = db.model('users')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    (req, res, next) =>
      Product.findAll({
        include: [{model: Rating}, {model: Comment}]
      })
        .then(products => {
          res.json(products)
      })
        .catch(next))
  .post('/',
    (req, res, next) =>
      Product.create(req.body)
      .then(product => res.status(201).json(product))
      .catch(next))
  .get('/:id',
    //mustBeLoggedIn,
    (req, res, next) =>
      Product.findById(req.params.id, {
        include: [{model: Comment,
          include: [User]
        }, {model: Rating}]
      })
      .then(product => res.json(product))
      .catch(next))
