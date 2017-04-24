import axios from 'axios'

/* ******* ACTIONS ********/
const SET_PAYMENTS = 'SET_PAYMENTSS'
const SET_PAYMENT = 'SET_PAYMENT'
const SET_PAYMENT_PROFILES = 'SET_PAYMENT_PROFILES'

/* ******* ACTION CREATORS ********/
const setPayments = payments => ({type: SET_PAYMENTS, payments})
const setPayment = payment => ({type: SET_PAYMENTID, paymentId})
const setPaymentProfiles = profiles => ({type: SET_PAYMENT_PROFILES, profiles})

/* ******* REDUCER ********/
const initialState = {
  payments: [],
  selectedPayment: '',
  payment_profiles: []
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

  case SET_PAYMENT_PROFILES: 
    newState.payment_profiles = action.profiles
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

export const fetchPaymentProfiles = userId => dispatch => {
  axios.get(`/api/payments/paymentProfile/${userId}`)
  .then(res=> res.data)
  .then(paymentProfiles=>{
    dispatch(setPaymentProfiles(paymentProfiles));

  })
}