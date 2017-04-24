'use strict'

const db = require('APP/db')
const {env} = require('APP')
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const Product = db.model('products')
const Rating = db.model('ratings')
const Comment = db.model('comments')
const User = db.model('users')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

const s3Funcs = require('./s3utils')

aws.config.update({
  signatureVersion: 'v4',
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
})
const s3 = new aws.S3({})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'bons-photos',
    metadata: (req, file, cb) => {
      cb(null, {fieldname: file.fieldname})
    },
    key: (req, file, cb) => {
      cb(null, Date.now()+file.originalname)
    }
  })
})

module.exports = require('express').Router()
  .get('/',
    (req, res, next) =>
      Product.findAll({
        include: [{model: User}]
      })
      .then(products => res.json(products))
      .catch(next))
  .post('/', upload.any(),
    (req, res, next) => {
      console.log('files to upload?', req.files)
      Product.create(req.body)
      .then(product => res.status(201).json(product))
      .catch(next)
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
  .get('/getSignedUrl', (req, res, next) =>
     s3Funcs.sign(req.body.filename, req.body.filetype)
    .then(output => res.json(output))
    .catch(next))
