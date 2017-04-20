import React from 'react'
import { connect } from 'react-redux'
import { getCartFromStorage, removeFromCart } from '../reducers/cart'

const CartSidebar = props => (
  <div className="col-xs-12">
    <h2>Cart</h2>
    <table className='table table-condensed'>
      <thead>
      <tr>
        <th>Qty</th>
        <th>Product</th>
        <th>Price</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
  {
    props.cart.productDetailList.map(product => {
      return <tr key={product.id}>
          <td>
{
            <input
              className="input-sm form-control"
              type="number"
              defaultValue={product.quantity}
            />
}
          </td>
          <td>{product.product.name}</td>
          <td>{props.normalizePrice(product.price)}</td>
          <td>
            <button
              onClick={(e) => {
                console.log('clicking button')
                props.removeProductDetail(product)
              }}
              className="btn btn-danger btn-xs"
            >x</button>
          </td>
        </tr>
    })
  }
    </tbody>
    </table>

    <div className="text-right"><strong>Subtotal:</strong> <br/> {props.normalizePrice(props.cart.totalPrice)} </div>
    <button className="btn btn-success pull-right">Checkout</button>
  </div>
)

const MapState = state => ({
  cart: state.cart
})

const MapDispatch = dispatch => ({
  getCartFromStorage,
  removeProductDetail(id) {
    dispatch(removeFromCart(id))
  },
  normalizePrice(price) {
    return `$ ${parseFloat(price).toFixed(2)}`
  }
})

const CartSideBarContainer = connect(MapState, MapDispatch)(CartSidebar)

export default CartSideBarContainer
