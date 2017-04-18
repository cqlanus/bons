import React from 'react'
import { Link } from 'react-router'

const NavBar = () =>
  (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/allProducts">bons</Link>
        </div>

        <div className="navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/allProducts">All Art</Link></li>
            <li><Link to="/allArtists">All Artists</Link></li>
            <li><Link to="/crops">Dashboard</Link></li>
            <li><Link to="/signUp">Sign Up</Link></li>
            <li><Link to="/Login">Log In</Link></li>
            <li><Link to="/crops">Log Out</Link></li>
          </ul>
        </div>

      </div>
    </nav>
  )

export default NavBar
