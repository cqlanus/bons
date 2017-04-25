'use strict'

const db = require('APP/db')
const Product = db.model('products')
const Rating = db.model('ratings')
const Comment = db.model('comments')
const User = db.model('users')
var Promise = require('bluebird')


const {mustBeLoggedIn, forbidden} = require('./auth.filters')
// TODO: auth filters
module.exports = require('express').Router()
  .get('/',
    (req, res, next) =>
      Product.findAll({
        include: [{model: User}]
      })
      .then(products => res.json(products))
      .catch(next))
  .post('/',
    (req, res, next) => {
      console.log("REQ.BODY IS", req.body)

      Product.create(req.body)
      .then(product => {
        console.log("PRODUCT CREATED", product)
        const addingCategories = Promise.map(req.body.categories, function(categoryId){
          return product.addCategory(categoryId)
        })
        return Promise.all([addingCategories])
        .then(function(){
          res.status(201).json(product)
        })
      })
      .catch(next)})
  .get('/:id',
    // mustBeLoggedIn,
    (req, res, next) =>
      Product.findById(req.params.id, {
        include: [{
          model: Comment,
          limit: 1,
          include: [User]
        }, {model: Rating},
        {model: User}]
      })
      .then(product => res.json(product))
      .catch(next))
