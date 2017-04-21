import React from 'react'
import { Link } from 'react-router'

const ProductPanel = function(props) {
  return (
    <div>
      <div className="panel panel-default">
        <div className="panel-heading">
        <Link to={`/products/${props.product.id}`}>
          <h4>{props.product.name}</h4>
        </Link>
        </div>

        <div className="panel-body">
          <Link to={`/products/${props.product.id}`}>
          <div className="row">
            <img src={props.product.img } className="fitWidth"/>
          </div>
          </Link>
          <p>Artist TBA</p>
          <p>Price ${props.product.unitPrice}</p>
        </div>
      </div>
    </div>

  )
}

export default ProductPanel
