import React from 'react'
import { connect } from 'react-redux'
import { getCartFromStorage, removeFromCart, updateProdDet } from '../reducers/cart'

class CartSidebar extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    return (
    <div>
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
      this.props.cart.productDetailList.map(product => {
        return <tr key={product.id}>
            <td>
  {
              <input
                className="input-sm form-control small-width"
                type="number"
                onBlur={(evt) => {
                  this.props.updateProdDetail(product.id,
                    {
                      quantity: evt.target.value,
                      price: (evt.target.value * product.product.unitPrice),
                    })
                }
                }
                defaultValue={product.quantity}
                min="1"
              />
  }
            </td>
            <td>{product.product.name}</td>
            <td>{this.props.normalizePrice(product.price)}</td>
            <td>
              <button
                onClick={(e) => {
                  this.props.removeProductDetail(product)
                }}
                className="btn btn-danger btn-xs"
              >x</button>
            </td>
          </tr>
      })
    }
      </tbody>
      </table>

      <div className="text-right"><strong>Subtotal:</strong> <br/> {this.props.normalizePrice(this.props.cart.totalPrice)} </div>
      <button className="btn btn-success pull-right">Checkout</button>
    </div>
    )
  }
}

const MapState = state => ({
  cart: state.cart
})

const MapDispatch = (dispatch) => ({
  getCartFromStorage,
  removeProductDetail(id) {
    dispatch(removeFromCart(id))
  },
  normalizePrice(price) {
    return `$ ${parseFloat(price).toFixed(2)}`
  },
  handleQtyChange(qty, product) {
    console.log(qty)
    product.price = product.product.unitPrice * qty
    console.log(product.price)
  },
  updateProdDetail(prodDetId, updates) {
    dispatch(updateProdDet(prodDetId, updates))
  }
})

const CartSideBarContainer = connect(MapState, MapDispatch)(CartSidebar)

export default CartSideBarContainer
