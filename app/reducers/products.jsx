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
  axios.post('/api/products', /* {headers: {ContentType: 'octet-stream'}}, */ product)
  .then(res => res.data)
  .then(newProduct => dispatch(setProduct(newProduct)))
  .catch(console.log)
}

export const postS3Img = files => {
  const file = files[0]
  axios.get('/getSignedUrl', {
    filename: file.name,
    filetype: file.type
  })
  .then(result => {
    // console.log('are we getting a reuslt???', result)
    const signedUrl = result.data.signedUrl
    const options ={
      headers: {
        'Content-Type': file.type
      }
    }
    return axios.put(signedUrl, file, options)
  })
  .then(result => {
    console.log('result', result)
  })
  .catch(console.log)
}
