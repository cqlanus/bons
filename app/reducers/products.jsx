import axios from 'axios'
import { browserHistory } from 'react-router'

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
export const fetchProducts = () => dispatch => {
  axios.get('/api/products')
    .then(res => res.data)
    .then(products => dispatch(setProducts(products)))
}

export const fetchProduct = productId => dispatch => {
  axios.get(`/api/products/${productId}`)
    .then(res => res.data)
    .then(product => {
      dispatch(setProduct(product))
    })
}

export const postProduct = product => dispatch => {
  console.log("IN POST PRODUCT")
  axios.post('/api/products', product)
  .then(res =>res.data)
  .then(newProduct => {
    dispatch(setProduct(newProduct))
    browserHistory.push(`/products/${newProduct.id}`)
  })
  .catch(console.log)
}

export const postS3Img = files => {
  const file = files[0]
  return axios.get(`/api/products/sign?filename=${file.name}&filetype=${file.type}`)
  .then(result => {
    console.log('are we getting a reuslt???', result.data)
    const signedUrl = result.data.signedRequest
    const options = {
      headers: {
        'Content-Type': file.type
      }
    }
    axios.put(signedUrl, file, options)
    return result.data.url
  })
  .catch(console.log)
}
