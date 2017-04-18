import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import ProductPanel from './ProductPanel'

const Home = props => (
  <div>
    <NavBar />
    <div className="container">
      <div className="row">
        <div className="col-xs-4">
          <ProductPanel />
        </div>

        <div className="col-xs-4">
          <ProductPanel />
        </div>

        <div className="col-xs-4">
          <ProductPanel />
        </div>
      </div>
    </div>
    <Footer />
  </div>
)

export default Home
