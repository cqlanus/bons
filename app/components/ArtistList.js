import React from 'react'
import { connect } from 'react-redux'
import ArtistPanel from './ArtistPanel.js'

const allArtists = (props) => (
  <div className="artistsPgBody">
    <div className="sendToBack">
      {/* <img src='./rococoFrame3.png'/> */}
    </div>

    <div className="listOfArtistNames">
      {props.artists.map((artist) => (<ArtistPanel key={artist.id} artist={artist}>{artist.name}</ArtistPanel>))}

    </div>





  </div>
)

const MapState = state => ({
  artists: state.artists.artists
})

const ArtistsPageContainer = connect(MapState, null)(allArtists)

export default ArtistsPageContainer
