import React from 'react'
import { Link, browserHistory } from 'react-router'
import { logout } from '../reducers/auth'
import { connect } from 'react-redux'
import Search from './Search'
import { fetchProducts, setProducts, filterProducts } from '../reducers/products'
import { dropCart } from '../reducers/cart'

const NavBar = props => {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">bons</Link>
        </div>
        <span className="slogan fancy pull-left">The Art of Luxury</span>
        <div className="navbar-collapse">
          <div className="col-xs-4">
          <Search
              getAllProducts={props.getProducts}
              resetProducts={props.resetProducts}
              products={props.products}
            />
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li></li>
            <li><Link to="/products">All Art</Link></li>
            <li><Link to="/artists">All Artists</Link></li>

{
  props.isLoggedIn ? <li><Link to={`/dashboard`}>Dashboard</Link></li> : <li><Link to="/signUp">Sign Up</Link></li>
}

{
  props.isLoggedIn ? <li><a className="pointer" onClick={props.logoutUser}>Log Out</a></li> : <li><Link to="/Login">Log In</Link></li>
}

          </ul>
        </div>

      </div>
    </nav>
  )
}

const MapState = state => ({
  isLoggedIn: state.auth && state.auth.id > 0,
  products: state.products.products
})

const MapDispatch = (dispatch, getState) => ({
  logoutUser() {
    dispatch(logout())
    window.sessionStorage.removeItem('cart')
    dispatch(dropCart())
    browserHistory.push('/')
  },
  resetProducts(filteredList) {
    dispatch(setProducts(filteredList))
  },
  getProducts() {
    dispatch(fetchProducts())
  }
})

const NavBarContainer = connect(MapState, MapDispatch)(NavBar)

export default NavBarContainer
