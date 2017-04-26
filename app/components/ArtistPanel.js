import React from 'react'
import { Link } from 'react-router'

const ArtistPanel = function(props) {
  return (
    <div>
      <Link to={`/artists/${props.artist.id}`}>
        <h4>{props.artist.name}</h4>
      </Link>

      {/* <div className="panel panel-default">
        <div className="panel-heading">
        <Link to={`/artists/${props.artist.id}`}>
          <h4>{props.artist.name}</h4>
        </Link>
        </div>

        <div className="panel-body">
          <Link to={`/products/${props.artist.id}`}>
          <div className="row">
            <img src='/snob.jpeg' width="100" height="100"/>
          </div>
          </Link>
        </div>
      </div> */}
    </div>

  )
}

export default ArtistPanel
