import React from 'react'
import { connect } from 'react-redux'

const ConfirmationPage = ({artist}) => (
  <h2>Congratulations, your order is complete!</h2>
)

const MapState = state => ({
  cart: state.cart,
  orders: state.orders

})

const ConfirmationPageContainer = connect(MapState, null)(ConfirmationPage)

export default ConfirmationPageContainer
