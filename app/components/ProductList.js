import React from 'react'
import ProductPanel from './ProductPanel'
import { connect } from 'react-redux'

// import {DISPATCHERS} from './store...probably'

const mapStateToProps = (state) => ({
  products: state.products.products,
  filteredProducts: state.products.filteredProducts
})
//
const mapDispatchToProps = dispatch => ({
    // fetchArticles: fetchArticles
})

const allProducts = (props) => (
    <div>
      <h2>Masterpieces at Bons</h2>
      <hr></hr>
      <div className="container">
        {
        props.products && props.products.length ? props.products.map(function(product) {
          return (
            <div className="col-xs-3" key={product.id}>
                <ProductPanel product={product}/>
            </div>
          )
        }) : 'Sorry, No Products!'
      }
    </div>
  </div>
  )

export default connect(mapStateToProps, mapDispatchToProps)(allProducts)
