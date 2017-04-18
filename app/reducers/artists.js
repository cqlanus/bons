import axios from 'axios'

/* ******* ACTIONS ********/
const SET_ARTISTS = 'SET_ARTISTS'
const SET_ARTIST = 'SET_ARTIST'

/* ******* ACTION CREATORS ********/
const setArtists = artists => ({type: SET_ARTISTS, artists})
const setArtist = artist => ({type: SET_ARTIST, artist})

/* ******* REDUCER ********/
const initialState = {
  artists: [],
  selectedArtist: {},
}

const reducer = (prevState = initialState, action) => {
  const newState = Object.assign({}, prevState)

  switch (action.type) {
    case SET_ARTISTS:
      newState.artists = action.artists
      return newState

    case SET_ARTIST:
      newState.selectedArtist = action.artist
      return newState

    default:
      return prevState
  }
}
export default reducer

/* ******* THUNK CREATORS ********/
export const fetchArtists = () => dispatch => {
  console.log('in thunk')
  axios.get('/api/products')
    .then(res => res.data)
    .then(products => dispatch(setProducts(products)))
}

export const fetchProduct = productId => dispatch => {
  console.log('productId from on enter', productId)
  axios.get(`/api/products/${productId}`)
    .then(res => res.data)
    .then(product => {
      console.log('product from axios call', product)
      dispatch(setProduct(product))
    })
}
