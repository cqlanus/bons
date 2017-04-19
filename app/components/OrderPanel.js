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
          <h4><b>Product Details:</b></h4>
          <table className="table">
            <tr>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Quantity</th>
            </tr>
            <tbody>
            {
              props.order.productDetails.map(function(product) {
                console.log('PRODUCT IN ORDER IS', product)
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
