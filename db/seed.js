'use strict'

const db = require('APP/db')
    , {User, Product, Category, ProductCategory, Promise} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    products: products(),
    // productDetails: productDetails(),
    // orders: orders(),
    categories: categories(),
  }

  seeded.product_categories = productCategories(seeded)
  // seeded.favorites = favorites(seeded)

  return Promise.props(seeded)
}

const users = seed(User, {
  marty: {
    email: 'sk8termarty1985@aol.com',
    name: 'Marty McFly',
    password_digest: '123',
    paymentMethod: 'cash'
  },
  docBrown: {
    email: 'greatScott88@example.gov',
    name: 'Dr. Emmett Brown',
    password_digest: '234',
    paymentMethod: 'credit'
  },
  biff: {
    email: 'trumpFan1@comcast.net',
    name: 'Biff Tannen',
    password_digest: '345',
    paymentMethod: 'debit'
  }
})

const products = seed(Product, {
  p1: {name: 'drawing1', img: 'http://i.imgur.com/XDjBjfu.jpg', unitPrice: 0.01},
  p2: {name: 'drawing2', img: 'http://i.imgur.com/Rs7b2FA.jpg', unitPrice: 0.01},
  p3: {name: 'drawing3', img: 'http://i.imgur.com/fHmZW3G.jpg', unitPrice: 0.01},
  p4: {name: 'painting1', img: 'http://i.imgur.com/fHmZW3G.jpg', unitPrice: 0.01},
  p5: {name: 'digital1', img: 'http://i.imgur.com/fHmZW3G.jpg', unitPrice: 0.01},
})

const categories = seed(Category, {
  drawing: {name: 'Drawing'},
  painting: {name: 'Painting'},
  digital: {name: 'Digital'},
})
// const productDetails = seed(ProductDetail, {
//   productQ1: {product_id: products.p1.id, quantity: 5, order_id: 1, price: 0.05},
//   productQ2: {product_id: products.p2.id, quantity: 2, order_id: 2, price: 0.02},
//   productQ3: {product_id: products.p3.id, quantity: 3, order_id: 3, price: 0.03},
//   productQ4: {product_id: products.p4.id, quantity: 1, order_id: 2, price: 0.01},
//   productQ5: {product_id: products.p5.id, quantity: 2, order_id: 2, price: 0.02},
// })

// const orders = seed(Order, {
//   order1: {totalPrice: 0.05, user_id: users.marty.id},
//   order2: {totalPrice: 0.08, user_id: users.docBrown.id},
//   order3: {totalPrice: 0.03, user_id: users.biff.id},
// })

/// ////////////////////////////////////////

// ORDERS HAVE TO BE SEEDED AFTER users
// PRODUCT_CATEGORY HAS TO BE SEEDED AFTER PRODUCTS & CATEGORIES
// PRODUCTDETAILS HAS TO BE SEEDED AFTER orders
//

const productCategories = seed(ProductCategory,  /// changed second one to plural
  ({products, categories}) => ({
    'p1 is drawing': {
      product_id: products.p1.id,
      category_id: categories.drawing.id,
    },
    'p2 is drawing': {
      product_id: products.p2.id,
      category_id: categories.drawing.id,
    },
    'p3 is drawing': {
      product_id: products.p3.id,
      category_id: categories.drawing.id,
    },
    'p4 is painting': {
      product_id: products.p4.id,
      category_id: categories.painting.id,
    },
    'p5 is digital': {
      product_id: products.p2.id,
      category_id: categories.digital.id,
    },
  })
)
// const favorites = seed(Favorite,
//   // We're specifying a function here, rather than just a rows object.
//   // Using a function lets us receive the previously-seeded rows (the seed
//   // function does this wiring for us).
//   //
//   // This lets us reference previously-created rows in order to create the join
//   // rows. We can reference them by the names we used above (which is why we used
//   // Objects above, rather than just arrays).
//   ({users, products}) => ({
//     // The easiest way to seed associations seems to be to just create rows
//     // in the join table.
//     'obama ordered....': {
//       user_id: users.barack.id,    // users.barack is an instance of the User model
//                                    // that we created in the user seed above.
//                                    // The seed function wires the promises so that it'll
//                                    // have been created already.
//       thing_id: things.surfing.id  // Same thing for things.
//     },
//     'god is into smiting': {
//       user_id: users.god.id,
//       thing_id: things.smiting.id
//     },
//     'obama loves puppies': {
//       user_id: users.barack.id,
//       thing_id: things.puppies.id
//     },
//     'god loves puppies': {
//       user_id: users.god.id,
//       thing_id: things.puppies.id
//     },
//   })
// )

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {users, products, categories, productCategories})
