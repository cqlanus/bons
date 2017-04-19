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
import signUp from './components/signUp'
import {fetchProducts, fetchProduct} from './reducers/products.jsx'
import {fetchOrders, fetchOrder} from './reducers/orders.jsx'
import {fetchArtists, fetchArtist} from './reducers/artists.js'



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
  console.log('on enter')
  store.dispatch(fetchProducts())
}

const getSelectedProduct = (nextRouterState) => {
  const productId = parseInt(nextRouterState.params.productId)
  console.log('productId', productId)
  store.dispatch(fetchProduct(productId))
}

const getSelectedArtist = (nextRouterState) => {
  const artistId = parseInt(nextRouterState.params.artistId)
  store.dispatch(fetchArtist(artistId))
}


function onOrderListEnter() {
  console.log('ON ORDERLIST ENTER')
  store.dispatch(fetchOrders())
}


render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Home}>
        <IndexRedirect to="/products" />
        <Route path ="/products" component = {ProductList} onEnter = {onProductsEnter}/>
        <Route path ="/products/:productId" component = {ProductPage} onEnter={getSelectedProduct}/>
        <Route path ="/artists" component = {ArtistList} />
        <Route path ="/artists/:artistId" component = {ArtistPage} onEnter = {getSelectedArtist}/>
        <Route path ="/orders" component = {OrderList} onEnter = {onOrderListEnter}/>
        <Route path ="/signUp" component = {signUp} />
        <Route path ="/Login" component = {Login} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
