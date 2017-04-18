import axios from 'axios'

/* ******* ACTIONS ********/
const SET_USERS = 'SET_USERS'
const SET_USER = 'SET_USER'

/* ******* ACTION CREATORS ********/
const setUsers = users => (
  {type: SET_USERS, users})
const setUser = product => (
  {type: SET_USER, user})

/* ******* REDUCER ********/
const initialState = {
  users: [],
  selectedUser: {},
}

const reducer = (prevState = initialState, action) => {
  const newState = Object.assign({}, prevState)

  switch (action.type) {
  case SET_USERS:
    newState.users = action.users
    return newState

  case SET_USER:
    newState.selectedUser = action.user
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
    .then(user => dispatch(setUser(user)))
}
