'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import Home from './components/Home'
import ProductList from './components/ProductList'
import ProductPage from './components/ProductPage'
import ArtistList from './components/ArtistList'
import ArtistPage from './components/ArtistPage'
import OrderList from './components/OrderList'
import OrderPage from './components/OrderPage'
import Dashboard from './components/Dashboard'
import signUp from './components/signUp'
import ShippingForm from './components/ShippingForm'
import PaymentForm from './components/PaymentForm'
import {fetchProducts, fetchProduct} from './reducers/products.jsx'
import {fetchOrders, fetchOrder} from './reducers/orders.jsx'
import {fetchArtists, fetchArtist} from './reducers/artists.js'
import {fetchUsers, fetchUser} from './reducers/user'
import {getCartFromStorage} from './reducers/cart'
import {whoami} from './reducers/auth'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)

function onProductsEnter() {
  store.dispatch(whoami())
  store.dispatch(fetchProducts())
  window.sessionStorage.cart ? store.dispatch(getCartFromStorage()) : null
}

const getSelectedProduct = (nextRouterState) => {
  const productId = parseInt(nextRouterState.params.productId)
  store.dispatch(fetchProduct(productId))
}

const getSelectedArtist = (nextRouterState) => {
  const artistId = parseInt(nextRouterState.params.artistId)
  store.dispatch(fetchArtist(artistId))
}

function onOrderListEnter() {
  store.dispatch(fetchOrders())
}

const getSelectedOrder = (nextRouterState) => {
  const orderId = parseInt(nextRouterState.params.orderId)
  store.dispatch(fetchOrder(orderId))
}

function onArtistListEnter() {
  store.dispatch(fetchArtists())
}

function onDashboardEnter(nextRouterState) {
  const userId = parseInt(nextRouterState.params.userId)
  store.dispatch(whoami())
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Home} onEnter = {onProductsEnter}>
        <IndexRedirect to="/products" />
        <Route path ="/products" component = {ProductList} onEnter = {onProductsEnter}/>
        <Route path ="/products/:productId" component = {ProductPage} onEnter={getSelectedProduct}/>
        <Route path ="/artists" component = {ArtistList} onEnter = {onArtistListEnter}/>
        <Route path ="/artists/:artistId" component = {ArtistPage} onEnter = {getSelectedArtist}/>
        <Route path ="/dashboard" component = {Dashboard} onEnter = {onDashboardEnter} />
        <Route path ="/orders" component = {OrderList} onEnter = {onOrderListEnter}/>
        <Route path ="/orders/:orderId" component = {OrderPage} onEnter = {getSelectedOrder}/>
<<<<<<< HEAD
        <Route path ="/shipping" component={ShippingForm} />
        <Route path ="/payment" component={PaymentForm} />
=======
>>>>>>> master
        <Route path ="/signUp" component = {signUp} />
        <Route path ="/Login" component = {Login} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
