import React from 'react'
import { browserHistory, Link } from 'react-router'
import {dropCart} from '../reducers/cart'

import { connect } from 'react-redux'

const ConfirmationPage = ({cart, selectedOrder, dropCart}) => (
  <div>
    <h2>Congratulations, your order is complete!</h2>
    <h3>Order Content</h3>
    {cart.productDetailList.map((product, index) =>{
    return (<p>{`${index+1}) ${product.product.name}...${product.quantity}`}</p>)
    })}
    <h3> Shipping Information </h3>
      <p>{selectedOrder ? selectedOrder.city: null}</p>
      <p>{selectedOrder ? selectedOrder.state: null}</p>
      <p>{selectedOrder ? selectedOrder.zip: null}</p>
      <Link to="/"><button onClick = {dropCart} onclassName="btn btn-success">Go Back Home</button></Link>
  </div>
)

const MapState = state => ({
  cart: state.cart,
  selectedOrder: state.orders.selectedOrder
})

const mapDispatchToProps = dispatch => ({
  dropCart() {
    console.log('dropping cart')
    dispatch(dropCart())
  }
})

const ConfirmationPageContainer = connect(MapState, null)(ConfirmationPage)

export default ConfirmationPageContainer
