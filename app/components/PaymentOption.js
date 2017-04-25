import React from 'react'
import { connect } from 'react-redux'
import { putOrder } from '../reducers/orders'
import { browserHistory, Link } from 'react-router'
import store from '../store'
import {fetchPayment} from '../reducers/payments'

// import { putPayment } from '../reducers/payment' /// correct this

const mapStateToProps = (state) => ({
  payment: state.payment
})

const mapDispatchToProps = {
  //setPayment: putPayment
}


export class PaymentOption extends React.Component {
  constructor() {
    super()
    this.state = {
      profile: 0,
    }
    // this.handleExpChange = this.handleExpChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.smooshExpDate = this.smooshExpDate.bind(this)
    this.handleProfileChange = this.handleProfileChange.bind(this)
  }

  handleProfileChange(evt) {
    const type = evt.target.name
    const value = evt.target.value
    this.setState({
      [type]: value
    })
  }
    
  handleSubmit(evt) {
    evt.preventDefault()
    if (this.state.profile === 'Enter new payment information' || this.state.profile===0) {
      browserHistory.push('/checkout/paymentoption/payment')
    } else {
      this.setSelectedProfileId();
      browserHistory.push(`checkout/paymentoption/populatedpayment/${this.state.profile}`)

    }
  }

  setSelectedProfileId() {
    let paymentId = this.state.profile
    store.dispatch(fetchPayment(paymentId))
  }

  render() {
    return (
      <div>
        <div>
          <h2>Please select your payment method:</h2>
        </div>
        <div className="col-xs-6">
          <form className="form-horizontal" onSubmit={this.handleSubmit}>

          <div className="form-group">
              <div>
                <select name="profile" className="form-control col-xs-2" onChange={this.handleProfileChange}>
                  <option>Enter new payment information</option>
                  {this.props.payment.payment_profiles.map((paypro=>{
                    return (<option key={paypro.id} value={parseInt(paypro.id)}> {paypro.name+' '+ '('+paypro.creditnumber.slice(-4)+')'} </option>)
                  }))}}
                </select>
              </div>
            </div>
            <div>
              <button type="submit" className="btn btn-danger pull-right">Select</button>
              <Link to="/checkout/shipping"><button className="btn btn-success">Back</button></Link>
            </div>
            <hr></hr>
            <div>
              {this.props.children}
            </div>
          </form>
          </div>
      </div>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentOption)


