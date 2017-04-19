import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import OrderPanel from './OrderPanel'

const Dashboard = ({user}) => (
  <div>
    <h1>{user.name}</h1>
    <h2>Orders</h2>
    {
      user.orders && user.orders.map(order => {
        return <OrderPanel key={order.id}/>
      })
    }

    <h2>Comments</h2>
    {
      user.comments && user.comments.map(comment => (
         <div key={comment.id} className="container">
           <div className="panel panel-default">
            <div className="panel-heading">
              <h4>Product: <Link to={`/products/${comment.product.id}`}>{comment.product.name}</Link></h4>
            </div>

            <div className="panel-body">
              Comment: {comment.comment}
            </div>
            </div>
          </div>)
      )
    }

    {
      user.isArtist ? <h2>Artistry</h2> : null
    }
  </div>
)

const MapState = state => ({
  user: state.users.selectedUser
})

const DashboardContainer = connect(MapState, null)(Dashboard)

export default DashboardContainer
