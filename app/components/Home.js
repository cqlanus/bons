import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'

const Home = props => (
  <div>
    <NavBar />
    <div className="container">
      {props.children}
    </div>
    <Footer />
  </div>
)

export default Home
