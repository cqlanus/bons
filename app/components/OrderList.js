import React from 'react'
import OrderPanel from './OrderPanel'
import { connect } from 'react-redux'

// import {DISPATCHERS} from './store...probably'

const mapStateToProps = (state) => ({
  orders: state.orders.orders,
})
//
const mapDispatchToProps = {
    //
}

const allOrders = (props) => {
  console.log('props to allOrders', props)
  return (
    <div>
      <h2>All Orders</h2>
      <hr></hr>
      <div className="container">
        {/*
          example:
          <div className="col-xs-4">
          <ProductPanel />
        </div> */
        props.orders.map(function(order) {
          // console.log('ORDER IS:', order)
          return (
            <div className="col-xs-4" key={order.id}>
              <OrderPanel order={order}/>
            </div>
          )
        })
      }
    </div>
  </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(allOrders)
