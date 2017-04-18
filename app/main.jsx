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
import signUp from './components/signUp'

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

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Home}>
        <IndexRedirect to="/products" />
        <Route path ="/products" component = {ProductList} />
        <Route path ="/products/:productId" component = {ProductPage} />
        <Route path ="/artists" component = {ArtistList} />
        <Route path ="/artists/:artistId" component = {ArtistPage} />
        <Route path ="/signUp" component = {signUp} />
        <Route path ="/Login" component = {Login} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)

