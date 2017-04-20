'use strict'

const db = require('APP/db')
const ProductDetails = db.model('productDetails')
const Order = db.model('orders')
const Product = db.model('products')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    (req, res, next) =>
      ProductDetails.findAll({
        include: [Order, Product]
      })
        .then(pds => res.json(pds))
        .catch(next))
  .post('/',
    (req, res, next) =>
      ProductDetails.create(req.body)
      .then(pd => {
        return ProductDetails.findById(pd.id, {include: [Product]})
        .then(foundPd => {
          console.log('productdetail with product??', foundPd)
          return foundPd.setOrder(req.body.order)
        })
        .then(pdWithOrder => res.status(201).json(pdWithOrder))
      })
      .catch(next)
      )
  .get('/:id',
    //mustBeLoggedIn,
    (req, res, next) =>
      ProductDetails.findById(req.params.id, {
        include: [Order, Product]
      })
      .then(pd => res.json(pd))
      .catch(next))
