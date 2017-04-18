import axios from 'axios'

/* ******* ACTIONS ********/
const SET_ORDERS = 'SET_ORDERS'
const SET_ORDER = 'SET_ORDER'

/* ******* ACTION CREATORS ********/
const setOrders = orders => ({type: SET_ORDERS, orders})
const setOrder = order => ({type: SET_ORDER, order})

/* ******* REDUCER ********/
const initialState = {
  orders: [],
  selectedOrder: {},
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
