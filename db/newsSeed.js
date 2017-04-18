var Promise = require('bluebird')
var { db, Place, User, Product, Category, Order, ProductCategory, ProductDetail } = require('./db')

var data = {
  users: [
    { email: 'sk8termarty1985@aol.com', name: 'Marty McFly', password_digest: '123', paymentMethod: 'cash', isAdmin: true, isArtist: false },
    { email: 'greatScott88@example.gov', name: 'Dr. Emmett Brown', password_digest: '234', paymentMethod: 'credit', isAdmin: true, isArtist: true},
    { email: 'trumpFan1@comcast.net', name: 'Biff Tannen', password_digest: '345', paymentMethod: 'debit', isAdmin: false, isArtist: false}
  ],
  products: [
    { name: 'drawing1', img: 'http://i.imgur.com/XDjBjfu.jpg', unitPrice: 0.01},
    { name: 'drawing2', img: 'http://i.imgur.com/Rs7b2FA.jpg', unitPrice: 0.01},
    { name: 'drawing3', img: 'http://i.imgur.com/fHmZW3G.jpg', unitPrice: 0.01},
    { name: 'painting1', img: 'http://i.imgur.com/fHmZW3G.jpg', unitPrice: 0.01},
    { name: 'digital1', img: 'http://i.imgur.com/fHmZW3G.jpg', unitPrice: 0.01},
  ],
  categories: [
    { name: 'Drawing'},
    { name: 'Painting'},
    { name: 'Digital'},
  ],
  orders: [
      { totalPrice: 0.01},
      { totalPrice: 0.02},
      { totalPrice: 0.03},
  ],

  productCategories: [
    { },
    { },
    { },
  ],
  productDetails: [
    { quantity: 1, order_id: 1, price: 0.01},
    { quantity: 2, order_id: 2, price: 0.02},
    { quantity: 3, order_id: 3, price: 0.03},
  ],
}

// ORDERS HAVE TO BE SEEDED AFTER users
// PRODUCT_CATEGORY HAS TO BE SEEDED AFTER PRODUCTS & CATEGORIES
// PRODUCTDETAILS HAS TO BE SEEDED AFTER orders

db.sync({force: true})
.then(function() {
  console.log('Dropped old data, now inserting data')
  const creatingUsers = Promise.map(data.users, function(user) {
    return User.create(user)
  })
  const creatingProducts = Promise.map(data.products, function(product) {
    return Product.create(product)
  })
  const creatingCategoies = Promise.map(data.categories, function(category) {
    return Category.create(category)
  })
  return Promise.all([creatingUsers, creatingProducts, creatingCategoies])
})
.then(function() {
  console.log('Adding data with associations')
  const creatingOrders = Promise.map(data.orders, function(order) {
    return Order.create(order)
    .then(order => {
      order.setUser(order.id)
    })
  })
  const creatingProductCategories = Promise.map(data.productCategories, function(productCategory) {
    return ProductCategory.create(productCategory)
    .then(productCategory => {
      productCategory.setProduct(productCategory.id)
      productCategory.setCategoty(productCategory.id < 4 ? 1 : productCategory.id < 5 ? 2 : 3)
    })
  })
})

.then(function() {
  console.log('Adding product details table')
  const creatingProductDetails = Promise.map(data.productDetails, function(productDetails) {
    return ProductDetail.create(productDetail)
    .then(productDetail => {
      productDetail.setOrder(productDetail.id)
    })
  })
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
