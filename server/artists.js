'use strict'

const db = require('APP/db')
const User = db.model('users')
const Order = db.model('orders')
const ProductDetail = db.model('productDetails')
const Product = db.model('products')
const Comment = db.model('comments')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')
//The name of the file should match the DB name
module.exports = require('express').Router()
  .get('/',
    (req, res, next) =>
      User.findAll({
        //Do we want to use eager loading this aggressively?
        where: {isArtist: true},
        //How about orders?
        include: [{model: Order,
          include: [{model: ProductDetail,
            include: [{model: Product}]
          }]
        }, {model: Comment}]  //Do we really always need comments every time we get a user?
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
    // Notice we return a different user format when getting all users vs one
    (req, res, next) =>
      User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(next))
