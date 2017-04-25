import React from 'react'
import { Link } from 'react-router'
import { logout } from '../reducers/auth'
import { connect } from 'react-redux'
import Search from './Search'
import { fetchProducts, setProducts, filterProducts } from '../reducers/products'

const NavBar = props => {
  // console.log('products', props.products)
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">bons</Link>
        </div>

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
  props.isLoggedIn ? <li><a onClick={props.logoutUser}>Log Out</a></li> : <li><Link to="/Login">Log In</Link></li>
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
