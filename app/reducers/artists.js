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
export const fetchArtists = function() {
  return function(dispatch) {
      axios.get('/api/artists')
      .then(res => res.data)
      .then(artists => dispatch(setArtists(artists)))
    }   
}

export const fetchArtist = artistId => dispatch => {
  axios.get(`/api/artists/${artistId}`)
    .then(res => res.data)
    .then(artist => {
      dispatch(setArtist(artist))
    })
}
