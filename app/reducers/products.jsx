import axios from 'axios'

/* ******* ACTIONS ********/
const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_PRODUCT = 'SET_PRODUCT'

/* ******* ACTION CREATORS ********/
const setProducts = products => ({type: SET_PRODUCTS, products})
const setProduct = product => ({type: SET_PRODUCT, product})

/* ******* REDUCER ********/
const initialState = {
  products: [],
  selectedProduct: {},
}

const reducer = (prevState = initialState, action) => {
  const newState = Object.assign({}, prevState)

  switch (action.type) {
  case SET_PRODUCTS:
    newState.products = action.products
    return newState

  case SET_PRODUCT:
    newState.selectedProduct = action.product
    return newState

  default:
    return prevState
  }
}
export default reducer

/* ******* THUNK CREATORS ********/
const fetchProducts = () => dispatch => {
  axios.get('/api/products')
    .then(res => res.data)
    .then(products => dispatch(setProducts(products)))
}

const fetchProduct = productId => dispatch => {
  axios.get(`/api/products/${productId}`)
    .then(res => res.data)
    .then(products => dispatch(setProducts(products)))
}
