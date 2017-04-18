'use strict'

const db = require('APP/db')
const Category = db.model('categories')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/', 
    (req, res, next) =>
      Category.findAll()
        .then(categories => res.json(categories))
        .catch(next))
  .post('/',
    (req, res, next) =>
      Category.create(req.body)
      .then(category => res.status(201).json(category))
      .catch(next))
  .get('/:id',
    //mustBeLoggedIn,
    (req, res, next) =>
      Category.findById(req.params.id)
      .then(category => res.json(category))
      .catch(next))
  