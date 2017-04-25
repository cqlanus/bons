import React from 'react'
import { Link } from 'react-router'

const ProductPanel = function({product}) {
  return (
    <div>
      <div className="panel panel-default">
        <div className="panel-heading">
        <Link to={`/products/${product.id}`}>
          <h4>{product.name}</h4>
        </Link>
        </div>

        <div className="panel-body">
          <Link to={`/products/${product.id}`}>
          <div className="row"><img src={product.img } className="fitWidth img-control-2"/></div>
          </Link>
          <p>Price: $ {product.unitPrice}</p>
          {product.user ? <p>by: <Link to={`/artists/${product.user.id}`}>{product.user.name}</Link></p> : null}
        </div>
      </div>
    </div>

  )
}

export default ProductPanel
