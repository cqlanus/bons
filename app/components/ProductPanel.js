import React from 'react'
import { Link } from 'react-router'

const ProductPanel = function({product}) {
  console.log("PRODUCT Img", product.img)
  return (
    <div className="indivArt">

          <Link to={`/products/${product.id}`}>
          {
            product.user ? <div className="row"><img src={ product.img } title={`${product.name} by ${product.user.name}`} className="fitWidth"/></div> : null
          }
          </Link>

    </div>

  )
}

export default ProductPanel
