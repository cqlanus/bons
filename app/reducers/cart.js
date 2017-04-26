import axios from 'axios'

/* ******* ACTIONS ********/
const SET_ORDER = 'SET_ORDER'
const ADD_PRODUCT_DETAIL = 'ADD_PRODUCT_DETAIL'
const REMOVE_PRODUCT_DETAIL = 'REMOVE_PRODUCT_DETAIL'
const UPDATE_CART = 'UPDATE_CART'
const SET_PRICE = 'SET_PRICE'
const GET_CART_FROM_STORAGE = 'GET_CART_FROM_STORAGE'
const SET_REVIEWING = 'SET_REVIEWING'
const UNDO_REVIEWING = 'UNDO_REVIEWING'
const DROP_CART = 'DROP_CART'

/* ******* ACTION CREATORS ********/
const setOrder = orderId => ({type: SET_ORDER, orderId})
export const addProductDetail = product => ({type: ADD_PRODUCT_DETAIL, product})
export const removeProductDetail = productId => ({type: REMOVE_PRODUCT_DETAIL, productId})
export const updateCart = prodDet => ({type: UPDATE_CART, prodDet})
export const setPrice = price => ({type: SET_PRICE, price})
export const getCartFromStorage = () => ({type: GET_CART_FROM_STORAGE})
export const setReviewing = () => ({type: SET_REVIEWING})
export const undoReviewing = () => ({type: UNDO_REVIEWING})
export const dropCart = () => ({type: DROP_CART})

/* ******* REDUCER ********/
const initialState = {
  orderId: 0,
  productDetailList: [],
  totalPrice: 0,
  reviewing: false,
}

const reducer = (prevState = initialState, action) => {
  const newState = Object.assign({}, prevState)

  switch (action.type) {
  case SET_ORDER:
    newState.orderId = action.orderId
    return newState

  case ADD_PRODUCT_DETAIL:
    newState.productDetailList = action.product
    return newState

  case REMOVE_PRODUCT_DETAIL:
    newState.productDetailList = prevState.productDetailList.filter(product =>
      product.id !== action.productId
    )
    return newState

  case SET_PRICE:
    newState.totalPrice = parseFloat(action.price)
    return newState

  case UPDATE_CART:
    const idx = newState.productDetailList.findIndex(prodDet => prodDet.id === action.prodDet.id)
    newState.productDetailList = [...newState.productDetailList.slice(0, idx), action.prodDet, ...newState.productDetailList.slice(idx + 1)]
    return newState

  case GET_CART_FROM_STORAGE:
    return JSON.parse(window.sessionStorage.cart) || {}

  case SET_REVIEWING:
    newState.reviewing = true
    return newState

  case UNDO_REVIEWING:
    newState.reviewing = false
    return newState

  case DROP_CART:
    return initialState

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
  })
  .then(() =>
    dispatch(addToCart(order.product))
  )
  .catch(console.log)
}

export const addToCart = (product/*, newTotal */) => (dispatch, getState) => {
  axios.post(`/api/productdetails`, {...product, order: getState().cart.orderId})
  .then(res => res.data)
  .then(() => {
    dispatch(fetchCurrentOrder(getState().cart.orderId))
  })
  .catch(console.log)
}

export const updateProdDet = (prodDetId, updates) => (dispatch, getState) => {
  axios.put(`/api/productdetails/${prodDetId}`, updates)
    .then(res => res.data)
    .then(prodDet => dispatch(updateCart(prodDet)))
    .then(() => dispatch(fetchCurrentOrder(getState().cart.orderId)))
    .catch(console.log)
}

export const removeFromCart = product => (dispatch, getState) => {
  axios.delete(`/api/productdetails/${product.id}`)
    .then(res => res.data)
    .then(() => {
      dispatch(fetchCurrentOrder(getState().cart.orderId))
    })
    .catch(console.log)
}

export const fetchCurrentOrder = orderId => (dispatch, getState) => {
  axios.get(`/api/orders/${orderId}`)
    .then(res => res.data)
    .then(order => {
      dispatch(setPrice(order.totalPrice))
      dispatch(addProductDetail(order.productDetails))
      if (!getState().cart.orderId) { dispatch(setOrder(orderId)) }
      window.sessionStorage.setItem('cart', JSON.stringify(getState().cart))
    })
    .catch(console.log)
}

export const destroyCart = orderId => dispatch => {
  axios.delete(`/api/orders/${orderId}`)
    .then(res => res.data)
    .then(() => {
      console.log('did i destroy???')
      dispatch(dropCart())
      window.sessionStorage.removeItem('cart')
    })
    .catch(console.log)
}
