import React from 'react'
import { connect } from 'react-redux'

const normalizePrice = price => {
  return `$ ${price}`
}

const singleProduct = ({product}) => (
  <div className="container">
    <h2>{product.name}</h2>
    <div className="row">
      <div className="col-xs-6">
        <img src={product.img} />
      </div>

      <div className="col-xs-6">
        <h3>Artist Name</h3>
        <h3>{normalizePrice(product.unitPrice)}</h3>
        <h3>Rating</h3>
        <button className="btn btn-primary">Add to Cart</button>
      </div>
    </div>

    <div className="row">
      <div className="col-xs-6">
        <h3>Comments</h3>
        <p>Comments will go here</p>
      </div>

      <div className="col-xs-6">
        <h3>Similar</h3>
        <p>Similar products will go here</p>
      </div>
    </div>
  </div>
)

const MapState = state => ({
  product: state.products.selectedProduct
})

const ProductPageContainer = connect(MapState, null)(singleProduct)

export default ProductPageContainer
