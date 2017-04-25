import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { createCartOrder, addToCart } from '../reducers/cart'
import CartSideBarContainer from './CartSidebar'

class singleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1,
    }
    this.handleQtyChange = this.handleQtyChange.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  handleQtyChange(evt) {
    this.setState({
      quantity: evt.target.name === 'less' ? (this.state.quantity - 1) : (this.state.quantity + 1)
    })
  }

  handleAddToCart(evt) {
    const userId = this.props.me ? this.props.me.id : null
    const productDet = {
      quantity: this.state.quantity,
      product_id: this.props.product.id
    }
    const order = {
      user_id: userId,
      product: productDet
    }
    if (!this.props.cart.orderId) {
      this.props.initiateOrder(order)
    } else {
      this.props.addToCart(productDet /*, newTotal */)
    }
  }

  render() {
    const product = this.props.product
    return (
    <div className="container">
    <div className="row">
      <div className="col-xs-9">
      <h2>{product.name}</h2>
      <div className="row">
        <div className="col-xs-5">
          <img src={product.img} className="img-control"/>
        </div>

        <div className="col-xs-5">
          <h4>Artist: {product.user ? <Link to={`/artists/${product.user.id}`}>{product.user.name}</Link> : null}</h4>
          <h3>{normalizePrice(product.unitPrice)}</h3>
          <h3>Rating: {product.ratings && product.ratings.length ? calcRatingAvg(product.ratings) : '--'}</h3>

{ this.props.hasItemBeenAdded(product.id, this.props.cart) ? null :
          <div className="row">
            <div className="col-xs-4">
              <div className="input-group">
                <span className="input-group-btn">
                  <button
                    name="less"
                    className="btn btn-default"
                    onClick={this.handleQtyChange}
                    disabled={this.state.quantity === 0}
                  >-</button>
                </span>
                <span type="text" name="qty" className="form-control text-center">{this.state.quantity}</span>
                <span className="input-group-btn">
                  <button name="more" className="btn btn-default" onClick={this.handleQtyChange}>+</button>
                </span>
              </div>
            </div>

            <div className="col-xs-4">
              <button className="btn btn-primary" onClick={this.handleAddToCart}>Add to Cart</button>
            </div>
          </div>
}
        </div>
      </div>

      <div className="row">
        <div className="col-xs-6">

          <h3>Comments
            <Link to={`/products/${product.id}/review`}>
              <button className="btn btn-primary btn-xs pull-right">
                Add your review
              </button>
            </Link>
          </h3>
  {
    product.comments && product.comments.map(comment => {
      return (<div className="panel panel-default" key={comment.id}>
                <div className="panel-body">
                  <p>{comment.comment}</p>
                  <p className="text-right">-- <Link to={`/users/${comment.user.id}`}>{comment.user.name}</Link></p>
                </div>
              </div>)
    })
  }
        </div>

        <div className="col-xs-6">
          <h3>Similar</h3>
          <p>Similar products will go here</p>
        </div>
      </div>
      </div>
{
       <div className="col-xs-3">
         <CartSideBarContainer />
       </div>
  }
    </div>
    </div>
    )
  }
}

const MapState = state => ({
  product: state.products.selectedProduct,
  cart: state.cart,
  me: state.auth,
})

const MapDispatch = dispatch => ({
  initiateOrder(order) {
    dispatch(createCartOrder(order))
  },
  addToCart(prod, tot) {
    dispatch(addToCart(prod, tot))
  },
  hasItemBeenAdded(productId, cart) {
    return cart.productDetailList.some(product =>
      product.product_id === productId
    )
  }
})

const ProductPageContainer = connect(MapState, MapDispatch)(singleProduct)

export default ProductPageContainer

const calcRatingAvg = ratings => {
  let sum = 0
  ratings.forEach(rating => {
    sum += rating.rating
  })
  return (sum/ratings.length).toFixed(2)
}

const normalizePrice = price => `$ ${price}`
