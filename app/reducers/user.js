import axios from 'axios'

/* ******* ACTIONS ********/
const SET_USERS = 'SET_USERS'
const SET_USER = 'SET_USER'

/* ******* ACTION CREATORS ********/
const setUsers = users => (
  {type: SET_USERS, users})
const setUser = userId => (
  {type: SET_USER, userId})

/* ******* REDUCER ********/
const initialState = {
  users: [],
  selectedUser: 0,
}

const reducer = (prevState = initialState, action) => {
  const newState = Object.assign({}, prevState)

  switch (action.type) {
  case SET_USERS:
    newState.users = action.users
    return newState

  case SET_USER:
    newState.selectedUser = action.userId
    return newState

  default:
    return prevState
  }
}
export default reducer

/* ******* THUNK CREATORS ********/
export const fetchUsers = () => dispatch => {
  axios.get('/api/users')
    .then(res => res.data)
    .then(users => dispatch(setUsers(users)))
}

export const fetchUser = userId => dispatch => {
  axios.get(`/api/users/${userId}`)
    .then(res => res.data)
    .then(user => dispatch(setUser(user.id)))
}

