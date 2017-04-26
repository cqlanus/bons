import React from 'react'
import {Link} from 'react-router'

const OrderPanel = function(props) {
  return (
    <div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <Link to={`/orders/${props.order.id}`}>
          <h3>Order ID#: {props.order.id}</h3>
        </Link>
        </div>

        <div className="panel-body">

          <table className="table">
            <thead>
            <tr>
              <th>Amount</th>
              <th>Status</th>
              <th>User ID#</th>
            </tr>
            </thead>
            <tbody>
              <tr>
              <td>${props.order.totalPrice}</td>
              <td>{props.order.complete ? 'Complete': 'In Progress'}</td>
              <td>{props.order.user_id}</td>
              </tr>
            </tbody>


          {/* <p>Total Price: <b>${props.order.totalPrice}</b></p>

          <p>User Info: TBD</p> */}
        </table>
          <h4><b className="pull-left">Product Details:</b></h4>
          <table className="table">
            <thead>
            <tr>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Quantity</th>
            </tr>
            </thead>
            <tbody>
            {
              props.order.productDetails && props.order.productDetails.map(function(product) {
                return (
                  <tr key={product.id}>
                    <td>{product.product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.quantity}</td>
                  </tr>
                )
              })

            }
          </tbody>

          </table>

        </div>
      </div>
    </div>

  )
}

export default OrderPanel
