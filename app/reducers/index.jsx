import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  products: require('./products').default,
  orders: require('./orders').default,
  users: require('./user').default,
  comments: require('./comments').default,
  artists: require('./artists').default,
  cart: require('./cart').default,
  payment: require('./payments').default

})

export default rootReducer
