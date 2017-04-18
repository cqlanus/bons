import React from 'react'
import { connect } from 'react-redux'

const normalizePrice = price => {
  return `$ ${price}`
}

const calcRatingAvg = ratings => {
  const sum = ratings.reduce((a=0, b) => {
    console.log('a', a)
    console.log('b', b)
    return a + b.rating
  })
  return (sum/ratings.length)
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
        <h3>Rating: {product.ratings && calcRatingAvg(product.ratings)}</h3>
        <button className="btn btn-primary">Add to Cart</button>
      </div>
    </div>

    <div className="row">
      <div className="col-xs-6">
        <h3>Comments</h3>
{
  product.comments && product.comments.map(comment => {
    return (<div className="panel panel-default" key={comment.id}>
              <p>{comment.comment}</p>
              <p>-- {comment.user.name}</p>
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

const MapState = state => ({
  product: state.products.selectedProduct
})

const ProductPageContainer = connect(MapState, null)(singleProduct)

export default ProductPageContainer
