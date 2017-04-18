import React from 'react'
import ProductPanel from './ProductPanel'

const allProducts = () => (
  <div>
  	THIS IS WHERE ALL PRODUCTS WILL BE VIEWED

    <div className="container">
    <div className="col-xs-4">
      <ProductPanel />
    </div>

    <div className="col-xs-4">
      <ProductPanel />
    </div>

    <div className="col-xs-4">
      <ProductPanel />
    </div>
    </div>
  </div>
)

export default allProducts