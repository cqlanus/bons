import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import ProductPanel from './ProductPanel'

export default function Home({children}) {
  return (
  <div>
    <NavBar />
    <div className="container container-main">
      <div className="row">
          {children}
      </div>
    </div>
    <Footer />
  </div>
  )
}
