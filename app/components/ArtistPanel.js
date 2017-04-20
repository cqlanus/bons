import React from 'react'
import { Link } from 'react-router'

const ArtistPanel = function(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
            <div className="well well-sm">
                <div className="row">
                    <div className="col-md-4">
                        <img src="./snob.jpeg" alt="" className="img-rounded img-responsive" />
                    </div>
                    <div className="col-md-8">
                        <h4> {props.artist.name}} </h4>
                        <small><cite title="San Francisco, USA">San Francisco, USA <i className="glyphicon glyphicon-map-marker">
                        </i></cite></small>
                        <p>
                            <i className="glyphicon glyphicon-envelope"></i>{props.artist.email}
                            <br />
                            <i className="glyphicon glyphicon-gift"></i>{props.artist.created_at}</p>
                        <div className="btn-group">
                            <button type="button" className="btn btn-primary">
                                Social</button>
                            <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                                <span className="caret"></span><span className="sr-only">Contact</span>
                            </button>
                            <ul className="dropdown-menu" role="menu">
                                <li><a href="#">Twitter</a></li>
                                <li><a href="https://plus.google.com/+Jquery2dotnet/posts">Google +</a></li>
                                <li><a href="https://www.facebook.com/jquery2dotnet">Facebook</a></li>
                                <li className="divider"></li>
                                <li><a href="#">Github</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>




  )
}

export default ArtistPanel