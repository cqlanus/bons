import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import OrderPanel from './OrderPanel'

const Dashboard = ({me}) => (
  <div>
    <h1>{me && me.name}</h1>
    <h2>Orders</h2>
    {
      me && me.orders.map(order => {
        return <OrderPanel order={order} key={order.id}/>
      })
    }

    <h2>Comments</h2>
    {
      me && me.comments.map(comment => (
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
      me && me.isArtist ? <h2>Artistry</h2> : null
    }
  </div>
)

const MapState = state => ({
  user: state.users.selectedUser,
  me: state.auth,
})

const DashboardContainer = connect(MapState, null)(Dashboard)

export default DashboardContainer
