'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import ConfirmationPageContainer from './components/ConfirmationPage'
import NotFound from './components/NotFound'
import Home from './components/Home'
import ProductList from './components/ProductList'
import ProductPage from './components/ProductPage'
import AddReviewContainer from './components/AddReview'
import ArtistList from './components/ArtistList'
import ArtistPage from './components/ArtistPage'
import AddArtContainer from './components/AddArt'
import OrderList from './components/OrderList'
import OrderPage from './components/OrderPage'
import Dashboard from './components/Dashboard'
import DashboardEdit from './components/DashboardEdit'
import signUp from './components/signUp'
import CartReview from './components/CartSidebar'
import ShippingForm from './components/ShippingForm'
import PaymentForm from './components/PaymentForm'
import CurrentOrder from './components/CurrentOrder'
import {fetchProducts, fetchProduct} from './reducers/products.jsx'
import {fetchOrders, fetchOrder} from './reducers/orders.jsx'
import {fetchArtists, fetchArtist} from './reducers/artists.js'
import {fetchUsers, fetchUser} from './reducers/user'
import PopulatedPayment from './components/PopulatedPayment'
import PaymentOption from './components/PaymentOption'
import {getCartFromStorage, fetchCurrentOrder, setReviewing, undoReviewing} from './reducers/cart'
import {whoami} from './reducers/auth'
import {fetchPayments, fetchPayment, fetchPaymentProfiles} from './reducers/payments'

function onProductsEnter() {
  store.dispatch(whoami())
  store.dispatch(fetchProducts())
  window.sessionStorage.cart ? store.dispatch(getCartFromStorage()) : null
  store.dispatch(undoReviewing())
}

const getSelectedProduct = (nextRouterState) => {
  const productId = parseInt(nextRouterState.params.productId)
  store.dispatch(fetchProduct(productId))
  store.dispatch(undoReviewing())
}

const getSelectedArtist = (nextRouterState) => {
  store.dispatch(whoami())
  if (store.getState().auth || nextRouterState.params.artistId) {
    const artistId = nextRouterState.params.artistId ? parseInt(nextRouterState.params.artistId) : store.getState().auth.id
    store.dispatch(fetchArtist(artistId))
  }
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

function onPaymentEnter(nextRouterState) {
  let userId = store.getState().auth.id;
  store.dispatch(fetchPaymentProfiles(userId))
}

const onReviewEnter = () => {
  store.dispatch(setReviewing())
}

const onShippingEnter = () => {
  store.dispatch(undoReviewing())
}

function onOptionEnter() {
  let userId = store.getState().auth.id
  store.dispatch(fetchPaymentProfiles(userId))
}



render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Home} onEnter = {onProductsEnter}>
        <IndexRedirect to="/products" />
        <Route path ="/products" component = {ProductList} onEnter = {onProductsEnter}/>
        <Route path ="/products/:productId" component = {ProductPage} onEnter={getSelectedProduct}/>
        <Route path ="/products/:productId/review" component = {AddReviewContainer} onEnter={getSelectedProduct}/>
        <Route path ="/artists" component = {ArtistList} onEnter = {onArtistListEnter}/>
        <Route path ="/artists/:artistId" component = {ArtistPage} onEnter = {getSelectedArtist}/>
        <Route path ="/addArt" component = {AddArtContainer} onEnter = {getSelectedArtist}/>
        <Route path ="/dashboard" component = {Dashboard} onEnter = {onDashboardEnter} />
        <Route path="/dashboard/edit" component={DashboardEdit} onEnter = {onDashboardEnter} />
        <Route path ="/orders" component = {OrderList} onEnter = {onOrderListEnter}/>
        <Route path ="/orders/:orderId" component = {OrderPage} onEnter = {getSelectedOrder}/>
        <Route path ="/confirmation/:orderId" component = {ConfirmationPageContainer} onEnter={getSelectedOrder}/>
        <Route path="/checkout" component={CurrentOrder}>
          <Route path ="reviewcart" component={CartReview} onEnter={onReviewEnter}/>
          <Route path ="shipping" component={ShippingForm} onEnter={onShippingEnter}/>
          <Route path ="paymentoption" component={PaymentOption} onEnter = {onOptionEnter}>
            <Route path ="payment" component={PaymentForm} onEnter = {onPaymentEnter}/>
            <Route path ="populatedpayment/:paymentId" component={PopulatedPayment} onEnter = {onPaymentEnter}/>
          </Route>
        </Route>
        <Route path ="/signUp" component = {signUp} />
        <Route path ="/Login" component = {Login} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
