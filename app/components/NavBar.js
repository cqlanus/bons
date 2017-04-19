import React from 'react'
import { Link } from 'react-router'
import { logout } from '../reducers/auth'
import { connect } from 'react-redux'

const NavBar = props =>
  (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">bons</Link>
        </div>

        <div className="navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/products">All Art</Link></li>
            <li><Link to="/artists">All Artists</Link></li>
{
  props.isLoggedIn ? <li><Link to={`/dashboard`}>Dashboard</Link></li> : <li><Link to="/signUp">Sign Up</Link></li>
}

{
  props.isLoggedIn ? <li><a onClick={props.logoutUser}>Log Out</a></li> : <li><Link to="/Login">Log In</Link></li>
}

          </ul>
        </div>

      </div>
    </nav>
  )

const MapState = state => ({
  isLoggedIn: state.auth && state.auth.id > 0,
  // me: state.auth.id,
})

const MapDispatch = dispatch => ({
  logoutUser() {
    dispatch(logout())
  }
})

const NavBarContainer = connect(MapState, MapDispatch)(NavBar)

export default NavBarContainer
