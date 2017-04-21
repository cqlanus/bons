import axios from 'axios'

/* ******* ACTIONS ********/
const SET_PAYMENTS = 'SET_PAYMENTSS'
const SET_PAYMENT = 'SET_PAYMENT'

/* ******* ACTION CREATORS ********/
const setPayments = payments => ({type: SET_PAYMENTS, payments})
const setPayment = payment => ({type: SET_PAYMENTID, paymentId})

/* ******* REDUCER ********/
const initialState = {
  payments: [],
  selectedPayment: '',
}

const reducer = (prevState = initialState, action) => {
  const newState = Object.assign({}, prevState)

  switch (action.type) {
  case SET_PAYMENTS:
    newState.payments = action.payments
    return newState

  case SET_PAYMENT:
    newState.selectedPayment = action.paymentId
    return newState

  default:
    return prevState
  }
}
export default reducer

/* ******* THUNK CREATORS ********/
export const fetchPayments = () => dispatch => {
  axios.get('/api/payments')
    .then(res => res.data)
    .then(payments => dispatch(setPayments(payments)))
}

export const fetchPayment = paymentId => dispatch => {
  axios.get(`/api/payments/${paymentId}`)
    .then(res => res.data.id)
    .then(paymentId => dispatch(setComment(paymentId)))
}
