import React from 'react'

const OrderPanel = function(props) {
  console.log('PROPS TO ORDER PANEL', props)
  return (
    <div className="col-xs-12">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>Order ID#: {props.order.id}</h4>
          <h3>Order Details:</h3>

        </div>

        <div className="panel-body">
          <p>User Info: TBD</p>
          <p>Total Price: ${props.order.totalPrice}</p>
          <p>Product Details:</p>
          <table className="table">
            <tr>
              <th>Title</th>
              <th>Unit Price</th>
              <th>Quantity</th>
            </tr>

            <td></td>

          </table>
          <p>Product Details:</p>
          <ol>
          {
            props.order.productDetails.map(function(product) {
              console.log('PRODUCT IN ORDER IS', product)
              return (
                <li key={product.id}>
                  <p>Title: {product.name}</p>
                  <p>Unit Price: {product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                </li>
              )
            })
          }
        </ol>
        </div>
      </div>
    </div>

  )
}

export default OrderPanel
