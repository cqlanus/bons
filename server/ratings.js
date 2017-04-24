'use strict'

const db = require('APP/db')
const Rating = db.model('ratings')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    (req, res, next) =>
      Rating.findAll()
        .then(ratings => res.json(ratings))
        .catch(next))
  .post('/',
    (req, res, next) =>
      Rating.create(req.body)
      .then(rating => res.status(201).json(rating))
      .catch(next))
  .get('/:id',
    //mustBeLoggedIn,
    (req, res, next) =>
      Rating.findById(req.params.id)
      .then(rating => res.json(rating))
      .catch(next))
