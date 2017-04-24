import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getCartFromStorage,
          removeFromCart,
          updateProdDet,
          setReviewing,
          undoReviewing,
          destroyCart } from '../reducers/cart'

class CartSidebar extends React.Component {
  constructor() {
    super()
    this.state = {
      reviewing: false,
    }

    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleClearCart = this.handleClearCart.bind(this)
  }

  handleCheckout(evt) {
    this.setState({
      reviewing: !this.state.reviewing
    })
  }

  handleClearCart(evt) {
    const orderId = this.props.cart.orderId
    console.log('clearing cart of order', orderId)
    if (orderId) {
      this.props.clearCart(orderId)
      this.props.getCartFromStorage()
    }
  }

  render() {
    return (
    <div>
      <div>
      <h2 className="">{ this.props.cart.reviewing ? 'Review Order': 'Cart'}
        { (this.props.cart.orderId && this.props.cart.reviewing) ? null : <button className="btn btn-danger btn-xs pull-right" onClick={this.handleClearCart}>Clear</button>}

      </h2>

      </div>
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

{ this.props.cart.reviewing ?
  <div className="border-top">
    <Link to="/checkout/shipping">
      <button className="btn btn-success pull-right">
        Confirm Shipping
      </button>
    </Link>
    <Link to={`/products/${this.props.lastProduct}`}>
      <button className="btn btn-success">
        Back
      </button>
    </Link>
  </div>
    :
    <div>
    <Link to="/products">
     <button
       className="btn btn-success"
     >
         Continue Shopping
     </button>
   </Link>
   <Link to="/checkout/reviewcart">
     <button
       className="btn btn-success pull-right"
       onClick={this.handleCheckout}
     >
         Checkout
     </button>
   </Link>
   </div>
    }

    </div>
    )
  }
}

const MapState = state => ({
  cart: state.cart,
  lastProduct: state.products.selectedProduct.id || ''
})

const MapDispatch = (dispatch) => ({
  getCartFromStorage,
  setReviewing,
  undoReviewing,
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
  },
  clearCart(orderId) {
    dispatch(destroyCart(orderId))
  }
})

const CartSideBarContainer = connect(MapState, MapDispatch)(CartSidebar)

export default CartSideBarContainer
