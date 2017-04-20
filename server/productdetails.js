'use strict'

const db = require('APP/db')
const ProductDetails = db.model('productDetails')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    (req, res, next) =>
      ProductDetails.findAll()
        .then(pds => res.json(pds))
        .catch(next))
  .post('/',
    (req, res, next) =>
      ProductDetails.create(req.body)
      .then(pd => {
        pd.setOrder(req.body.order)
        res.status(201).json(pd)
      })
      .catch(next))
  .get('/:id',
    //mustBeLoggedIn,
    (req, res, next) =>
      ProductDetails.findById(req.params.id)
      .then(pd => res.json(pd))
      .catch(next))
