import axios from 'axios'
// TOOD: should be .js instead of .jsx

const reducer = (state=null, action) => {
  switch (action.type) {
  case AUTHENTICATED:
    return action.user
  }
  return state
}

const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const signup = (email, password) =>
  dispatch => {
    axios.post('/api/auth/signup/local', {email, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))
  }

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))

export const updateProfile = (updates) =>
  dispatch =>
    axios.put('/api/auth/update', updates)
      .then(res => res.data)
      .then(user => {
        console.log('updated user???', user)
        dispatch(authenticated(user))
      })
      .catch(console.log)

export default reducer
