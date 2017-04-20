import axios from 'axios'

/* ******* ACTIONS ********/
const SET_ORDER = 'SET_ORDER'
const ADD_PRODUCT_DETAIL = 'ADD_PRODUCT_DETAIL'
const REMOVE_PRODUCT_DETAIL = 'REMOVE_PRODUCT_DETAIL'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

/* ******* ACTION CREATORS ********/
const setOrder = orderId => ({type: SET_ORDER, orderId})
const addProductDetail = product => ({type: ADD_PRODUCT_DETAIL, product})
const removeProductDetail = productId => ({type: REMOVE_PRODUCT_DETAIL, productId})
const updateProduct = product => ({type: UPDATE_PRODUCT, product})

/* ******* REDUCER ********/
const initialState = {
  orderId: 0,
  productDetailList: [],
  totalPrice: 0,
}

const reducer = (prevState = initialState, action) => {
  const newState = Object.assign({}, prevState)

  switch (action.type) {
  case SET_ORDER:
    newState.orderId = action.orderId
    return newState

  case ADD_PRODUCT_DETAIL:
    newState.productDetailList = [...prevState.productDetailList, action.product]
    return newState

  case REMOVE_PRODUCT_DETAIL:
    newState.productDetailList = prevState.productDetailList.filter(product =>
      product.id !== action.productId
    )
    return newState

  case UPDATE_PRODUCT:
    // newState.productDetailList
    return newState

  default:
    return prevState
  }
}
export default reducer

/* ******* THUNK CREATORS ********/
export const createCartOrder = order => dispatch => {
  axios.post(`/api/orders`, order)
  .then(res => res.data)
  .then(newOrder => {
    console.log(newOrder)
    dispatch(setOrder(newOrder.id))
  })
}
