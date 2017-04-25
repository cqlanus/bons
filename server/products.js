'use strict'

const db = require('APP/db')
const {env} = require('APP')
const aws = require('aws-sdk')

const Product = db.model('products')
const Rating = db.model('ratings')
const Comment = db.model('comments')
const User = db.model('users')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

const s3Funcs = require('./s3utils')
const Promise = require('bluebird')

aws.config.update({
  signatureVersion: 'v4',
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
})
const s3 = new aws.S3({})

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
      Product.create(req.body)
      .then(product => {
        const addingCategories = Promise.map(req.body.categories, function(categoryId) {
          return product.addCategory(categoryId)
        })
        return Promise.all([addingCategories])
        .then(function() {
          res.status(201).json(product)
        })
      })
      .catch(next)
    })
  .get('/sign', (req, res, next) => {
    s3Funcs.sign(req.query.filename, req.query.filetype, res)
  })
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
