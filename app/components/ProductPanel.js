import React from 'react'

const ProductPanel = function(props) {
  return (
    <div className="col-xs-12">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>{props.product.name}</h4>
        </div>

        <div className="panel-body">
          <div className="row">
            <img src={props.product.img} />
          </div>
          <p>Artist TBA</p>
          <p>Price ${props.product.unitPrice}</p>
        </div>
      </div>
    </div>

  )
}

export default ProductPanel
