import axios from 'axios'


/* ******* ACTIONS ********/
const SET_PAYMENTS = 'SET_PAYMENTSS'
const SET_PAYMENTID = 'SET_PAYMENTID'
const SET_PAYMENT_PROFILES = 'SET_PAYMENT_PROFILES'

/* ******* ACTION CREATORS ********/
const setPayments = payments => ({type: SET_PAYMENTS, payments})
const setPayment = paymentId => ({type: SET_PAYMENTID, paymentId})
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

  case SET_PAYMENTID:
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
    .then(res => {
      return(res.data.id)
    })
    .then(paymentId => {
      dispatch(setPayment(paymentId))
    })
}

export const fetchPaymentProfiles = userId => dispatch => {
  axios.get(`/api/payments/paymentProfile/${userId}`)
  .then(res=> {
    console.log('res', res)
    return res.data
  })
  .then(paymentProfiles=>{
    console.log('paymentProfiles', paymentProfiles)
    dispatch(setPaymentProfiles(paymentProfiles));

  })
}




