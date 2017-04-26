import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import OrderPanel from './OrderPanel'
import ProductPanel from './ProductPanel'

const Dashboard = ({me, products}) => (
  <div>
  { me ?
      <div>
      <h1>{me && me.name}</h1>
      <Link to="/dashboard/edit">Edit profile</Link>
      <h2>Orders</h2>
      {
        (me && me.orders) && me.orders.map(order => {
          return <div className="col-xs-12" key={order.id}><OrderPanel order={order}/></div>
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
        me && me.isArtist ? <div>
        <h2>Artistry
        <Link to="/addart" className="pull-right"><button className="btn btn-primary">Add More Art</button></Link>
        </h2>

        <div className="row">
        {
          products.map(product => {
            return (<div className="col-xs-2" key={product.id}>
                      <ProductPanel product={product} />
                    </div>)
          })
        }
        </div>
        </div> : null
      }
      </div>
  : <h1>Must be logged in</h1>  }
  </div>
)

const MapState = state => ({
  user: state.users.selectedUser,
  products: state.products.products.filter(product => {
    return product.user_id === state.auth.id
  }),
  me: state.auth,
})

const DashboardContainer = connect(MapState, null)(Dashboard)

export default DashboardContainer
