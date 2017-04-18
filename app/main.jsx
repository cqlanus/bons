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
import allProducts from './components/allProducts'
import singleProduct from './components/singleProduct'
import allArtists from './components/allArtists'
import singleArtist from './components/singleArtist'
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
        <IndexRedirect to="/allProducts" />
        <Route path ="/allProducts" component = {allProducts} />
        <Route path ="/singleProduct" component = {singleProduct} />
        <Route path ="/allArtists" component = {allArtists} />
        <Route path ="/singleArtist" component = {singleArtist} />
        <Route path ="/signUp" component = {signUp} />
        <Route path ="/Login" component = {Login} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)

