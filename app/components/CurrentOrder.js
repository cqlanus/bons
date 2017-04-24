import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { destroyCart } from '../reducers/cart'

const CurrentOrder = ({cart, clearCart, children}) => (

  <div>
    <button
      className="btn btn-danger btn-xs pull-right"
      onClick={() => {
        clearCart(cart.orderId)
        browserHistory.push('/')
      }}
    >Cancel Order</button>
    {children}
  </div>
)

const MapState = state => ({
  cart: state.cart
})

const MapDispatch = dispatch => ({
  clearCart(orderId) {
    dispatch(destroyCart(orderId))
  }
})

const CurrentOrderContainer = connect(MapState, MapDispatch)(CurrentOrder)


export default CurrentOrderContainer
