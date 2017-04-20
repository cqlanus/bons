import React from 'react'
import { connect } from 'react-redux'
import { getCartFromStorage } from '../reducers/cart'

const CartSidebar = props => (
  //same comment regarding layout
  <div className="col-xs-12">
    <h2>Cart</h2>
    <table className='table table-condensed'>
      <thead>
      <tr>
        <th>Qty</th>
        <th>Product</th>
        <th>Price</th>
      </tr>
      </thead>
      <tbody>
  {
    props.cart.productDetailList.map(product => {
      return <tr key={product.id}>
          <td>{product.quantity}</td>
          <td>{product.product.name}</td>
          <td>{product.price}</td>
        </tr>
    })
  }
    </tbody>
    </table>

    <div className="text-right"><strong>Subtotal:</strong> <br/> $ {props.cart.totalPrice} </div>
    <button className="btn btn-success pull-right">Checkout</button>
  </div>
)

const MapState = state => ({
  cart: state.cart
})

const MapDispatch = dispatch => ({getCartFromStorage})

const CartSideBarContainer = connect(MapState, MapDispatch)(CartSidebar)

export default CartSideBarContainer
