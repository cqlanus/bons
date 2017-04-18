import React from 'react'

const ProductPanel = function(props) {
  console.log('PROPS TO PRODUCT PANEL', props)
  return (
    <div className="col-xs-12">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>This will be a title</h4>
        </div>

        <div className="panel-body">
          <p>This will be a description with an image</p>
          <p>Artist Name</p>
          <p>Price</p>
        </div>
      </div>
    </div>

  )
}

export default ProductPanel
