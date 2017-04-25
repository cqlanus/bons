import React from 'react'
import { connect } from 'react-redux'
import { putOrder } from '../reducers/orders'
import { browserHistory, Link } from 'react-router'

const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  putOrder(order) {
    dispatch(putOrder(order))
  }
})


export class ShippingForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    // console.log(this.state)
    const type = evt.target.name
    const value = evt.target.value
    this.setState({
      [type]: value
    })
  }

  handleSubmit(evt) {
    console.log('IN HANDLE SUBMIT')
    evt.preventDefault()
    this.props.putOrder({...this.state, orderId: this.props.cart.orderId})
    browserHistory.push('/checkout/paymentoption')
  }

  render() {
    return (
      <div>
        <div>
          <h2>Add Shipping Info:</h2>
        </div>
        <div className="col-xs-6">
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div>
                <label htmlFor="ShippingName">Ship To:</label>
              </div>
              <div>
                <input name="name" type="text" className="form-control col-xs-6" onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-group">
              <div>
                <label htmlFor="StreetAddress">Street Address:</label>
              </div>
              <div>
              <div>
                <input name="address" type="text" className="form-control col-xs-6" onChange={this.handleChange} />
              </div>
            </div>
          </div>
            <div className="form-group">
              <div>
                <label htmlFor="City">City:</label>
              </div>
              <div>
                <input name="city" type="text" className="form-control col-xs-6" onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-group">
              <div>
                <label htmlFor="State">State:</label>
              </div>
              <div>
                <input name="state" type="text" className="form-control col-xs-6" onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-group">
              <div>
                <label htmlFor="Zip">Zip Code:</label>
              </div>
              <div>
                <input name="zip" type="text" className="form-control col-xs-6" onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-group">
              <div>
                <label htmlFor="PhoneNumber">Phone Number:</label>
              </div>
              <div>
                <input name="phone" type="text" className="form-control col-xs-6" onChange={this.handleChange} />
              </div>
            </div>
            <div className="col-xs-12 border-top">
              <button type="submit" className="btn btn-success pull-right">Proceed To Payment Info</button>

              <Link to="/checkout/reviewcart"><button className="btn btn-success">Back to Order Review</button></Link>
            </div>

          </form>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingForm)
