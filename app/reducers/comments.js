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
const fetchComments = () => dispatch => {
  axios.get('/api/comments')
    .then(res => res.data)
    .then(comments => dispatch(setComments(comments)))
}

const fetchComment = commentId => dispatch => {
  axios.get(`/api/comments/${commentId}`)
    .then(res => res.data)
    .then(comment => dispatch(setComment(comment)))
}
