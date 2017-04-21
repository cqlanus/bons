import React from 'react'
import { connect } from 'react-redux'
import { putOrder } from '../reducers/orders'
import { browserHistory, Link } from 'react-router'

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = {
  putOrder: putOrder
}

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
    // console.log('IN HANDLE SUBMIT')
    evt.preventDefault()
    this.props.putOrder(this.state)
  }

  render() {
    return (
      <div>
        <div>
          <h2>Add Shipping Info:</h2>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>

            <div className="form-group">
              <div>
                <label htmlFor="ShippingName">Ship To:</label>
              </div>
              <div className="col-xs-6">
                <input name="name" type="text" className="form-control col-xs-6" onChange={this.handleChange} />
              </div>
            </div>

            <div>-</div>
            <div className="form-group">
              <div>
                <label htmlFor="StreetAddress">Street Address:</label>
              </div>
              <div className="col-xs-6">
                <input name="address" type="text" className="form-control col-xs-6" onChange={this.handleChange} />
              </div>
            </div>

            <div>-</div>
            <div className="form-group">
              <div>
                <label htmlFor="City">City:</label>
              </div>
              <div className="col-xs-6">
                <input name="city" type="text" className="form-control col-xs-6" onChange={this.handleChange} />
              </div>
            </div>

            <div>-</div>
            <div className="form-group">
              <div>
                <label htmlFor="State">State:</label>
              </div>
              <div className="col-xs-6">
                <input name="state" type="text" className="form-control col-xs-6" onChange={this.handleChange} />
              </div>
            </div>

            <div>-</div>
            <div className="form-group">
              <div>
                <label htmlFor="Zip">Zip Code:</label>
              </div>
              <div className="col-xs-6">
                <input name="zip" type="text" className="form-control col-xs-6" onChange={this.handleChange} />
              </div>
            </div>

            <div>-</div>
            <div className="form-group">
              <div>
                <label htmlFor="PhoneNumber">Phone Number:</label>
              </div>
              <div className="col-xs-6">
                <input name="phone" type="text" className="form-control col-xs-6" onChange={this.handleChange} />
              </div>
            </div>

            <div>-</div>
            <div>-</div>
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-primary">submit</button>
            </div>

          </form>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingForm)
