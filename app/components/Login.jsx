import React from 'react'
import {browserHistory} from 'react-router'

export const Login = ({ login }) => (
  <div>
  <h1>Login</h1>
  <form onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.username.value, evt.target.password.value)
    browserHistory.push('/')
  } }>
    <input name="username" />
    <input name="password" type="password" />
    <input type="submit" value="Login" />
  </form>

  <div className="buffer oauth">
    <a target="_self" href="/api/auth/login/google" className="btn btn-default">
      <i className="fa fa-google"/>
      <span>Sign in with Google</span>
    </a>
  </div>

  </div>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Login)
