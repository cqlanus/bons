import React from 'react'

const OrderPanel = function(props) {
  console.log('PROPS TO ORDER PANEL', props)
  return (
    <div className="col-xs-12">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>ORDER TITLE OR SOMETHING</h4>
        </div>

        <div className="panel-body">
          <p>Artist TBA</p>
          <p>Price </p>
        </div>
      </div>
    </div>

  )
}

export default OrderPanel
