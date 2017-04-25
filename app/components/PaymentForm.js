import React from 'react'
import { connect } from 'react-redux'
import { putOrder } from '../reducers/orders'
import { browserHistory, Link } from 'react-router'
// import { putPayment } from '../reducers/payment' /// correct this

const mapStateToProps = (state) => ({
  payment: state.payment
})

const mapDispatchToProps = {
  //setPayment: putPayment
}

export class PaymentForm extends React.Component {
  constructor() {
    super()
    this.state = {
      profile: 0,
      type: '',
      typeOfCard: '',
      name: '',
      creditnumber: '',
      expiration: '',
      securitycode: '',
      zip: '',
    }
    this.handleChange = this.handleChange.bind(this)
    // this.handleExpChange = this.handleExpChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.smooshExpDate = this.smooshExpDate.bind(this)
    this.handleProfileChange = this.handleProfileChange.bind(this)
  }

  handleChange(evt) {
    const type = evt.target.name
    const value = evt.target.value
    this.setState({
      [type]: value
    })
    // console.log(this.state)
  }

  handleProfileChange(evt) {
    const type = evt.target.name
    const value = evt.target.value
    this.setState({
      [type]: value
    })
  }
    

  handleSubmit(evt) {
    console.log('IN PAYMENT HANDLE SUBMIT')
    evt.preventDefault()
    // this.props.putPayment(this.state)
  }

  render() {
    return (
      <div>
        <div>
          <h2>Please enter your payment information:</h2>
        </div>
        <div className="col-xs-6">
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div>
                <label htmlFor="type">Select type of payment:</label>
              </div>
              <div>
                <select name="type" className="form-control col-xs-2" onChange={this.handleChange}>
                  <option>Card</option>
                  <option>Cash</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div>
                <label htmlFor="name">Name on card:</label>
              </div>
              <div>
                <input name="name" type="text" className="form-control col-xs-6" onChange={this.handleChange} />
              </div>
            </div>

            <div className="form-group">
              <div>
                <label htmlFor="creditnumber">Card number:</label>
              </div>
              <div>
                <input name="creditnumber" type="text" className="form-control col-xs-6" onChange={this.handleChange} />
              </div>
            </div>

            <div className="form-group">
              <div>
                <label htmlFor="expiration">Expiration:</label>
              </div>

              <div>

                <input name="expiration" type="text" className="form-control col-xs-6" onChange={this.handleChange} placeholder="MM/YYYY"/>
              </div>
            </div>

            <div className="form-group">
              <div>
                <label htmlFor="securitycode">Security code:</label>
              </div>
              <div>
                <input name="securitycode" type="text" className="form-control col-xs-6" onChange={this.handleChange} />
              </div>
            </div>

            <div className="form-group">
              <div>
                <label htmlFor="zip">Zip Code:</label>
              </div>
              <div>
                <input name="zip" type="text" className="form-control col-xs-6" onChange={this.handleChange} />
              </div>
            </div>

            <div>
              <button type="submit" className="btn btn-danger pull-right">Confirm Payment Information</button>

            </div>

          </form>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm)
