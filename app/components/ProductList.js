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

const allProducts = (props) => (
    <div>
      <div className="mainTitle">
        <h1 className="big fancy">M</h1><h1>a</h1><h1>s</h1><h1>t</h1><h1>e</h1><h1>r</h1><h1>p</h1><h1>i</h1><h1>e</h1><h1>c</h1><h1>e</h1><h1>s</h1><h1 className="no"> at </h1><h1>Bons</h1>
        <hr></hr>
      </div>

      <div className="art container">
        {
        props.products.map(function(product) {
          return (
            <div className="col-xs-4 indivArt" key={product.id}>
                <ProductPanel product={product}/>
            </div>
          )
        })
      }
    </div>
  </div>
  )

export default connect(mapStateToProps, mapDispatchToProps)(allProducts)
