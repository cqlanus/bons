import React from 'react'
import { connect } from 'react-redux'

const singleArtist = ({artist}) => (
  <div className="container">
  <h2> The Amateur </h2>
    <div className="row">
      <div className="col-xs-6">
      	<img src="/snob.jpeg" width="100" height="100" />
      </div>
      <h2>{artist.name}</h2>

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
