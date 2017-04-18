import React from 'react'
import ProductPanel from './ProductPanel'
import { connect } from 'react-redux'

// import {DISPATCHERS} from './store...probably'

// const mapStateToProps = (state) => {
//   return {
//     articles: state.articles
//   }
// }
//
// const mapDispatchToProps = {
//     fetchArticles: fetchArticles
// }

class allProducts extends React.Component {
  // lifecycle methods

  render() {
    console.log('PROPS TO PRODUCTPANEL IS:', this.props)
    return (
      <div>
        THIS IS WHERE ALL PRODUCTS WILL BE VIEWED

        <div className="container">
          {/*
            example:
            <div className="col-xs-4">
            <ProductPanel />
          </div> */
          this.props.products.map(function(product) {
            return (
              <div className="col-xs-4">
                <ProductPanel />
              </div>
            )
          })
        }
        </div>
      </div>

    )
  }
}

export default allProducts
