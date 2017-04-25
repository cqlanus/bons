'use strict'

const db = require('APP/db')
const Comment = db.model('comments')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
// QUESTION: will we ever get all comments? I would think they would be scoped to a product or a user
  .get('/',
    (req, res, next) =>
      Comment.findAll()
        .then(comments => res.json(comments))
        .catch(next))
  .post('/',
    (req, res, next) =>
      Comment.create(req.body)
      .then(comment => res.status(201).json(comment))
      .catch(next))
  .get('/:id',
    //mustBeLoggedIn,
    (req, res, next) =>
      Comment.findById(req.params.id)
      .then(comment => res.json(comment))
      .catch(next))

