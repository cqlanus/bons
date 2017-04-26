var Promise = require('bluebird')
const db = require('./index.js')
var {User, Product, Category, Order, ProductCategory, ProductDetail, Rating, Comment, Payment} = db

var data = {
  users: [
    { email: 'sk8termarty1985@aol.com', name: 'Marty McFly', password: '123', paymentMethod: 'cash', isAdmin: true, isArtist: false },
    {email: 'greatScott88@example.gov', name: 'Dr. Emmett Brown', password: '234', paymentMethod: 'credit', isAdmin: true, isArtist: true},
    {email: 'trumpFan1@comcast.net', name: 'Biff Tannen', password: '345', paymentMethod: 'debit', isAdmin: false, isArtist: false},
    {email: 'chris@chris.chris', name: 'Chris Lanus', password: '123', paymentMethod: 'credit', isAdmin: true, isArtist: true}
  ],
  products: [
    {name: 'animaybe', img: './crappyArt/animaybe.png', unitPrice: 0.01, user_id: 1},
    {name: 'drawing2', img: '/crappyArt/prancingUnicorn.png', unitPrice: 0.01, user_id: 3},
    {name: 'drawing3', img: '/crappyArt/couch.png', unitPrice: 0.01, user_id: 1},
    {name: 'painting1', img: '/crappyArt/DOGS.png', unitPrice: 0.01, user_id: 1},
    {name: 'digital1', img: '/crappyArt/meeeee.png', unitPrice: 0.01, user_id: 3},
  ],
  categories: [
    {name: 'Drawing'},
    {name: 'Painting'},
    {name: 'Digital'},
    {name: 'Jewelry'},
    {name: 'Home Decor'},
    {name: 'Photograph'},
    {name: 'Mixed Media'},
  ],
  orders: [
      {totalPrice: 0.01, user_id: 1},
      {totalPrice: 0.02, user_id: 2},
      {totalPrice: 0.03, user_id: 3},
  ],

  productCategories: [
    {product_id: 1, category_id: 1},
    {product_id: 2, category_id: 1},
    {product_id: 2, category_id: 5},
    {product_id: 3, category_id: 1},
    {product_id: 4, category_id: 2},
    {product_id: 4, category_id: 5},
    {product_id: 5, category_id: 3},
    {product_id: 5, category_id: 5},
  ],
  productDetails: [
    {quantity: 1, order_id: 1, price: 0.01, product_id: 1},
    {quantity: 2, order_id: 2, price: 0.02, product_id: 2},
    {quantity: 3, order_id: 3, price: 0.03, product_id: 3},
  ],
  ratings: [
    {rating: 5, user_id: 1, product_id: 1},
    {rating: 4, user_id: 2, product_id: 1},
    {rating: 5, user_id: 3, product_id: 1},
    {rating: 2, user_id: 2, product_id: 2},
    {rating: 4, user_id: 3, product_id: 2},
    {rating: 3, user_id: 3, product_id: 3},
    {rating: 1, user_id: 1, product_id: 3},
  ],
  comments: [
    {comment: 'This product was cool', user_id: 1, product_id: 1},
    {comment: 'This product was good', user_id: 2, product_id: 1},
    {comment: 'This product was not good', user_id: 3, product_id: 1},
    {comment: 'This product was excellent', user_id: 2, product_id: 2},
    {comment: 'This product was sweet', user_id: 3, product_id: 2},
    {comment: 'This product was decent', user_id: 3, product_id: 3},
    {comment: 'This product was fantastic', user_id: 1, product_id: 3},
  ],
  payments: [
    {type: 'credit', name: 'ellie sterner', user_id: 1, creditnumber: 12341234, expiration: '08/13/1993', securitycode: '123', zip: '60174'},
    {type: 'credit', name: 'ellie sterner', user_id: 2, creditnumber: 23452345, expiration: '08/13/1993', securitycode: '123', zip: '60174'},
    {type: 'credit', name: 'ellie sterner', user_id: 3, creditnumber: 34563456, expiration: '08/13/1993', securitycode: '123', zip: '60174'},
    {type: 'credit', name: 'ellie sterner', user_id: 2, creditnumber: 45674567, expiration: '08/13/1993', securitycode: '123', zip: '60174'},
    {type: 'credit', name: 'ellie sterner', user_id: 3, creditnumber: 56785678, expiration: '08/13/1993', securitycode: '123', zip: '60174'},
    {type: 'credit', name: 'ellie sterner', user_id: 3, creditnumber: 67896789, expiration: '08/13/1993', securitycode: '123', zip: '60174'},
    {type: 'credit', name: 'ellie sterner', user_id: 1, creditnumber: 78907890, expiration: '08/13/1993', securitycode: '123', zip: '60174'},
  ]
}

// ORDERS HAVE TO BE SEEDED AFTER users
// PRODUCT_CATEGORY HAS TO BE SEEDED AFTER PRODUCTS & CATEGORIES
// PRODUCTDETAILS HAS TO BE SEEDED AFTER orders

db.didSync
.then(function() {
  console.log('Dropped old data, now inserting data')
  const creatingUsers = Promise.map(data.users, function(user) {
    return User.create(user)
  })

  const creatingCategoies = Promise.map(data.categories, function(category) {
    return Category.create(category)
  })
  return Promise.all([creatingUsers, creatingCategoies])
})
.then(() => {
  console.log('Addign products table')
  const creatingProducts = Promise.map(data.products, function(product) {
    return Product.create(product)
  })
  return Promise.all([creatingProducts])
})
.then(function() {
  console.log('Adding data with associations')
  const creatingOrders = Promise.map(data.orders, function(order) {
    return Order.create(order)
  })
  return Promise.all([creatingOrders])
})
.then(function() {
  console.log('Adding product details table')
  const creatingProductDetails = Promise.map(data.productDetails, function(productDetail) {
    return ProductDetail.create(productDetail)
  })
  return Promise.all([creatingProductDetails])
})
.then(() => {
  console.log('Adding rating details table')
  const creatingRatingDetails = Promise.map(data.ratings, (rating) => {
    return Rating.create(rating)
  })
  return Promise.all([creatingRatingDetails])
})
.then(() => {
  console.log('Adding comment details table')
  const creatingCommentDetails = Promise.map(data.comments, (comment) => {
    return Comment.create(comment)
  })
  return Promise.all([creatingCommentDetails])
})
.then(() => {
  console.log('Adding product-category details table')
  const creatingProdCatDetails = Promise.map(data.productCategories, (prodCat) => {
    return Product.findById(prodCat.product_id)
      .then(product => product.addCategory(prodCat.category_id))
  })
  return Promise.all([creatingProdCatDetails])
})
.then(() => {
  console.log('Adding payment details table')
  const creatingPaymentDetails = Promise.map(data.payments, (payment) => {
    return Payment.create(payment)
  })
  return Promise.all([creatingPaymentDetails])
})
.then(function() {
  console.log('Finished inserting data')
})
.catch(function(err) {
  console.error('There was totally a problem', err, err.stack)
})
.finally(function() {
  db.close() // creates but does not return a promise
  return null // stops bluebird from complaining about un-returned promise
})
