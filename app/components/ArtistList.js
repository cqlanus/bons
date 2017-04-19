import React from 'react'
import { connect } from 'react-redux'
import ArtistPanel from './ArtistPanel.js'

const allArtists = (props) => (
  <div>
  	{props.artists.map((artist)=>{
  		return (<ArtistPanel key={artist.id} artist={artist}>{artist.name}</ArtistPanel>)
  	})}
  </div>
)

const MapState = state => ({
  artists: state.artists.artists
})

const ArtistsPageContainer = connect(MapState, null)(allArtists)

export default ArtistsPageContainer