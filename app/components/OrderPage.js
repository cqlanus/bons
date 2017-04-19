import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'

const mapStateToProps = (state) => ({
  selectedOrder: state.orders.selectedOrder
})

const mapDispatchToProps = {

}

const singleOrder = ({selectedOrder}) => {
  const user = selectedOrder.user
  const styles = {
    textAlign: 'right'
  }
  console.log('selected order IS:', selectedOrder)
  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Order ID#: {selectedOrder.id}_______I'd like to put this on the right-hand side...____>______<span><Link to={`/orders`}>Back to All Orders</Link></span></h3>
        </div>
        <div className="panel-body">

          <div className="col-xs-6">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Product Info:</h3>
              </div>
              <div className="panel-body">

                <table className="table">
                  <tr>
                    <th>Product</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                  </tr>
                  <tbody>
                  {
                    selectedOrder.productDetails && selectedOrder.productDetails.map(function(product) {
                      // console.log('PRODUCT IN ORDER IS', product)
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

          {user &&

            <div className="col-xs-6">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">User Info:</h3>
                </div>
                <div className="panel-body">
                  <table className="table">
                    <tr>
                      <th>User Name</th>
                      <th>User Email</th>
                      <th>User ID#</th>
                    </tr>
                    <tbody>
                      <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.id}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          }
          <div></div>
          { user &&

            <div className="col-xs-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Payment & Delivery Info:</h3>
                </div>
                <div className="panel-body">
                  <div>
                    <h5><b>Payment Method:</b> placeholder- userModel needs payment</h5>
                  </div>
                  <div>
                    <h5><b>Delivery Address:</b> placeholder- userModel needs address</h5>
                  </div>
                </div>
              </div>
            </div>

          }

        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(singleOrder)
