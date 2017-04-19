import React from 'react'
import {login, signup} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

export const Signup = ({ login, signup }) => (
  <div>
    <h1>Sign Up</h1>
    <form onSubmit={evt => {
      evt.preventDefault()
      signup(evt.target.username.value, evt.target.password.value)
      browserHistory.push('/')
    } }>
      <input name="username" />
      <input name="password" type="password" />
      <input type="submit" value="Sign Up" />
    </form>
  </div>
)

export default connect(
  state => ({}),
  {login, signup},
)(Signup)
