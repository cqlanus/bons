import React from 'react'
import ProductPanel from './ProductPanel'
import { connect } from 'react-redux'

// TODO: put into a containers dir
// import {DISPATCHERS} from './store...probably'

const mapStateToProps = (state) => ({
  products: state.products.products,
})
//
const mapDispatchToProps = {
    // fetchArticles: fetchArticles
}

const allProducts = (props) => (
    <div>
      <h2>Masterpieces at Bons</h2>
      <hr></hr>
      <div className="container">
        {
        props.products.map(function(product) {
          return (
            <div className="col-xs-4" key={product.id}>
                <ProductPanel product={product}/>
            </div>
          )
        })
      }
    </div>
  </div>
  )

export default connect(mapStateToProps, mapDispatchToProps)(allProducts)
