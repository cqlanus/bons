import React from 'react'
import { connect } from 'react-redux'
import ProductPanel from './ProductPanel'

const singleArtist = ({artist}) => (
  <div className="container">
    <div className="row">
      <div className="col-xs-6">
        <img src="/snob.jpeg" width="100" height="100" />
      </div>
      <h2>{artist.name}</h2>
    </div>

    <div className="row">
      <div className="col-xs-12">
      <h3>Artistry</h3>
{
  artist.products && artist.products.map(product => (
    <div className="col-xs-2" key={product.id}>
      <ProductPanel product={product}/>
    </div>
  ))
}
      </div>
    </div>

    <div className="row">
      <div className="col-xs-6">
        <h3>Comments</h3>
        <p>Comments will go here</p>
      </div>

      <div className="col-xs-6">
        <h3>Similar</h3>
        <p>Similar artists will go here</p>
      </div>
    </div>
  </div>
)

const MapState = state => ({
  artist: state.artists.selectedArtist
})

const ArtistPageContainer = connect(MapState, null)(singleArtist)

export default ArtistPageContainer
