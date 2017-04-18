var Promise = require('bluebird');
var { db, Place, User, Product, Activity } = require('./db');

var data = {
  users: [
    { email: 'sk8termarty1985@aol.com', name: 'Marty McFly', password_digest: '123', paymentMethod: 'cash'},
    { email: 'greatScott88@example.gov', name: 'Dr. Emmett Brown', password_digest: '234', paymentMethod: 'credit'},
    { email: 'trumpFan1@comcast.net', name: 'Biff Tannen', password_digest: '345', paymentMethod: 'debit'}
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
  ]
};

db.sync({force: true})
.then(function () {
  console.log("Dropped old data, now inserting data");
  const creatingUsers = Promise.map(data.users, function (user) {
    return User.create(user);
  });
  const creatingProducts = Promise.map(data.products, function (product) {
    return Products.create(product);
  });
  const creatingCategoies = Promise.map(data.categories, function (category) {
    return Category.create(category);
  });
  return Promise.all([creatingUsers, creatingProducts, creatingCategoies]);
})
.then(function () {
  console.log('Finished inserting data');
})
.catch(function (err) {
  console.error('There was totally a problem', err, err.stack);
})
.finally(function () {
  db.close(); // creates but does not return a promise
  return null; // stops bluebird from complaining about un-returned promise
});
Contact GitHub API Training Shop Blog About
