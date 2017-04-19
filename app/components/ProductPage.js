import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const normalizePrice = price => {
  return `$ ${price}`
}

const calcRatingAvg = ratings => {
  let sum = 0
  ratings.forEach(rating => {
    sum += rating.rating
  })
  return (sum/ratings.length).toFixed(2)
}

class singleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1,
    }
    this.handleQtyChange = this.handleQtyChange.bind(this)
  }

  handleQtyChange(evt) {
    this.setState({
      quantity: evt.target.name === 'less' ? (this.state.quantity - 1) : (this.state.quantity + 1)
    })
  }

  render() {
    const product = this.props.product
    return (
    <div className="container">
      <h2>{product.name}</h2>
      <div className="row">
        <div className="col-xs-6">
          <img src={product.img} />
        </div>

        <div className="col-xs-6">
          <h3>Artist Name</h3>
          <h3>{normalizePrice(product.unitPrice)}</h3>
          <h3>Rating: {product.ratings && product.ratings.length ? calcRatingAvg(product.ratings) : '--'}</h3>

          <div className="row">
          <button className="btn btn-primary">Add to Cart</button>

          <div className="col-xs-3">
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
          </div>

        </div>
      </div>

      <div className="row">
        <div className="col-xs-6">
          <h3>Comments</h3>
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
    )
  }
}

const MapState = state => ({
  product: state.products.selectedProduct
})

const ProductPageContainer = connect(MapState, null)(singleProduct)

export default ProductPageContainer
