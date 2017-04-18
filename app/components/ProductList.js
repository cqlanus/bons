import React from 'react'
import ProductPanel from './ProductPanel'
import { connect } from 'react-redux'

// import {DISPATCHERS} from './store...probably'

const mapStateToProps = (state) => ({
  products: state.products.products,
})
//
const mapDispatchToProps = {
    // fetchArticles: fetchArticles
}

const allProducts = (props) => {
  console.log('props to allProducts', props)
  return (
    <div>
      THIS IS WHERE ALL PRODUCTS WILL BE VIEWED

      <div className="container">
        {/*
          example:
          <div className="col-xs-4">
          <ProductPanel />
        </div> */
        props.products.map(function(product) {
          return (
            <div className="col-xs-4">
              <ProductPanel product={product}/>
            </div>
          )
        })
      }
    </div>
  </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(allProducts)
