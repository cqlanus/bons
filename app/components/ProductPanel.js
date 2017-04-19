import React from 'react'
import { Link } from 'react-router'

const ProductPanel = function(props) {
  return (
    <div className="col-xs-12">
      <div className="panel panel-default">
        <div className="panel-heading">
<<<<<<< HEAD
          <h4>Title: {props.product.name}</h4>
=======
        <Link to={`/products/${props.product.id}`}>
          <h4>{props.product.name}</h4>
        </Link>
>>>>>>> master
        </div>

        <div className="panel-body">
          <Link to={`/products/${props.product.id}`}>
          <div className="row">
            <img src={props.product.img } className="fitWidth"/>
          </div>
<<<<<<< HEAD
          <p>Artist TBD</p>
=======
          </Link>
          <p>Artist TBA</p>
>>>>>>> master
          <p>Price ${props.product.unitPrice}</p>
        </div>
      </div>
    </div>

  )
}

export default ProductPanel
