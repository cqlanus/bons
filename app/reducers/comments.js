import axios from 'axios'

/* ******* ACTIONS ********/
const SET_COMMENTS = 'SET_COMMENTS'
const SET_COMMENT = 'SET_COMMENT'

/* ******* ACTION CREATORS ********/
const setComments = comments => ({type: SET_COMMENTS, comments})
const setComment = comment => ({type: SET_COMMENT, comment})

/* ******* REDUCER ********/
const initialState = {
  comments: [],
  selectedComment: {},
}

const reducer = (prevState = initialState, action) => {
  const newState = Object.assign({}, prevState)

  switch (action.type) {
  case SET_COMMENTS:
    newState.comments = action.comments
    return newState

  case SET_COMMENT:
    newState.selectedComment = action.comment
    return newState

  default:
    return prevState
  }
}
export default reducer

/* ******* THUNK CREATORS ********/
export const fetchComments = () => dispatch => {
  axios.get('/api/comments')
    .then(res => res.data)
    .then(comments => dispatch(setComments(comments)))
    .catch(console.log)
}

export const fetchComment = commentId => dispatch => {
  axios.get(`/api/comments/${commentId}`)
    .then(res => res.data)
    .then(comment => dispatch(setComment(comment)))
    .catch(console.log)
}

export const postComment = review => dispatch => {
  axios.post(`/api/comments/`, review)
    .then(res => res.data)
    .then(comment => {
      console.log('comment posted', comment)
    })
    .catch(console.log)
}

export const postRating = review => dispatch => {
  axios.post(`/api/ratings/`, review)
    .then(res => res.data)
    .then(rating => {
      console.log('rating posted', rating)
    })
    .catch(console.log)
}