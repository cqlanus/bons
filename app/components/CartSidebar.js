import React from 'react'
import { connect } from 'react-redux'
import { getCartFromStorage } from '../reducers/cart'

const CartSidebar = props => (
  <div className="col-xs-12">
    <h2>Cart</h2>
  {
    props.cart.productDetailList.map(product => {
      return <div key={product.product_id}>product_id: {`${product.product_id}`} </div>
    })
  }
  </div>
)

const MapState = state => ({
  cart: state.cart
})

const MapDispatch = dispatch => ({getCartFromStorage})

const CartSideBarContainer = connect(MapState, MapDispatch)(CartSidebar)

export default CartSideBarContainer
