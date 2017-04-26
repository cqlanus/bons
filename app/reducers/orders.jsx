import { browserHistory } from 'react-router'
import axios from 'axios'

/* ******* ACTIONS ********/
const SET_ORDERS = 'SET_ORDERS'
const SET_ORDER = 'SET_ORDER'

const CREATE_ORDER = 'CREATE_ORDER'

/* ******* ACTION CREATORS ********/
const setOrders = orders => ({type: SET_ORDERS, orders})
const setOrder = order => ({type: SET_ORDER, order})

const createOrder = order => ({type: CREATE_ORDER, order})

/* ******* REDUCER ********/
const initialState = {
  orders: [],
  selectedOrder: {},
  orderInProgress: {},
}

const reducer = (prevState = initialState, action) => {
  const newState = Object.assign({}, prevState)

  switch (action.type) {
  case SET_ORDERS:
    newState.orders = action.orders
    return newState

  case SET_ORDER:
    newState.selectedOrder = action.order
    return newState

  case CREATE_ORDER:
    newState.orderInProgress = action.order
    return newState

  default:
    return prevState
  }
}
export default reducer

/* ******* THUNK CREATORS ********/
export const fetchOrders = () => dispatch => {
  axios.get('/api/orders')
    .then(res => res.data)
    .then(orders => dispatch(setOrders(orders)))
}

export const fetchOrder = orderId => dispatch => {
  axios.get(`/api/orders/${orderId}`)
    .then(res => res.data)
    .then(order => dispatch(setOrder(order)))
}

export const putOrder = newOrder => dispatch => {
  axios.put(`/api/orders/${newOrder.orderId}`, newOrder) // { id, tp, shipping}
  .then(res => res.data)
  .then(updatedOrder => {
    dispatch(createOrder(updatedOrder))
  })
}

export const postPayment = newPayment => dispatch => {
  axios.post(`/api/payments/`, newPayment) // { id, tp, shipping}
  .then(res => res.data)
  .then(updatedOrder => {
    dispatch(setOrder(updatedOrder))
    console.log('updatedOrder', updatedOrder)
  })
}
