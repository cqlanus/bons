import axios from 'axios'

/* ******* ACTIONS ********/
const SET_ORDER = 'SET_ORDER'
const ADD_PRODUCT_DETAIL = 'ADD_PRODUCT_DETAIL'
const REMOVE_PRODUCT_DETAIL = 'REMOVE_PRODUCT_DETAIL'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const SET_PRICE = 'SET_PRICE'
const GET_CART_FROM_STORAGE = 'GET_CART_FROM_STORAGE'

/* ******* ACTION CREATORS ********/
const setOrder = orderId => ({type: SET_ORDER, orderId})
export const addProductDetail = product => ({type: ADD_PRODUCT_DETAIL, product})
export const removeProductDetail = productId => ({type: REMOVE_PRODUCT_DETAIL, productId})
const updateProduct = product => ({type: UPDATE_PRODUCT, product})
export const setPrice = price => ({type: SET_PRICE, price})
export const getCartFromStorage = () => ({type: GET_CART_FROM_STORAGE})

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

  case SET_PRICE:
    newState.totalPrice = parseFloat(action.price)
    return newState

  case UPDATE_PRODUCT:
    // newState.productDetailList
    return newState

  case GET_CART_FROM_STORAGE:
  //sessionStorage is a dangerous place to place potential sensitive information
    return JSON.parse(window.sessionStorage.cart) || {}

  default:
    return prevState
  }
}
export default reducer

/* ******* THUNK CREATORS ********/
export const createCartOrder = order => (dispatch, getState) => {
  axios.post(`/api/orders`, order)
  .then(res => res.data)
  .then(newOrder => {
    dispatch(setOrder(newOrder.id))
    dispatch(setPrice(newOrder.totalPrice))
  })
  .then(() => {
    axios.post('/api/productdetails', {...order.product, order: getState().cart.orderId})
    .then(res => res.data)
    .then(newProdDet => {
      console.log('RETURNED PRODUCT DETAIL', newProdDet)
      dispatch(addProductDetail(newProdDet))
      window.sessionStorage.setItem('cart', JSON.stringify(getState().cart))
    })
  })
}

export const addToCart = (product, newTotal) => (dispatch, getState) => {
  axios.post(`/api/productdetails`, {...product, order: getState().cart.orderId})
  .then(res => res.data)
  .then(newProdDet => {
    dispatch(addProductDetail(newProdDet))
    dispatch(setPrice(newTotal))
    window.sessionStorage.setItem('cart', JSON.stringify(getState().cart))
  })
  .then(() => {
    console.log('is this happening?')
  })
  .catch(console.log)
}

export const fetchProdDet = prodDetId => dispatch => {
  axios.get(`/api/productdetails/${prodDetId}`)
    .then(res => res.data)
    .then(prodDet => {
      console.log('DOES THIS ONE HAVE ORDER INFO?', prodDet)
      dispatch(addProductDetail(prodDet))
    })
    .catch(console.log)
}
