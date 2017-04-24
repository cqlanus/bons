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
      .then(pd => pd.calculateProdDetPrice())
      .then(productDetail => productDetail.setOrder(req.body.order))
      .then(pdWithOrder => pdWithOrder.getTotalOrderPrice())
      .then(foundProductDetail => ProductDetails.findById(foundProductDetail.id, {include: [Product]}))
      .then(prodDet => res.status(201).json(prodDet))
      .catch(next)
      )
  .get('/:id',
    // mustBeLoggedIn,
    (req, res, next) =>
      ProductDetails.findById(req.params.id, {
        include: [Order, Product]
      })
      .then(pd => res.json(pd))
      .catch(next))
  .delete('/:id', (req, res, next) => {
    ProductDetails.destroy({where: {id: req.params.id}})
    .then(() => res.sendStatus(204))
    .catch(next)
  })
  .put('/:id', (req, res, next) =>
    ProductDetails.update(req.body, {
      where: {id: req.params.id},
      include: [Product],
      returning: true
    })
    .then(updatedProdDet => {
      const actualProdDet = updatedProdDet[1][0]
      return ProductDetails.findById(actualProdDet.id, {include: [Product]})
    })
    .then(prodDet => res.json(prodDet))
    .catch(next)
  )
