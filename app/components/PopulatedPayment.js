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

export class PopulatedPayment extends React.Component {
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

  findPaymentProfile(paymentId) {
    let payments = this.props.payment.payment_profiles;
    let selPay = payments.filter((payPro)=>{
      if (payPro.id === paymentId) {
        return true;
      } else {
        return false;
      }
    })
    console.log('returning this object', selPay)
    return selPay
  }
    


  handleSubmit(evt) {
    console.log('IN PAYMENT HANDLE SUBMIT')
    evt.preventDefault()
    // this.props.putPayment(this.state)
  }

  toDisplayHide(attribute, hardCodedVal, currentProfile) {
    if (currentProfile[attribute]!==hardCodedVal) {
      return (<option>{hardCodedVal}</option>)
    }
  }

  render() {
    let selPay = this.findPaymentProfile(this.props.payment.selectedPayment)
    if (selPay[0].id) {
      var currentProfile = selPay[0]
    }
    return (
      <div>
        <div>
          <h2>Please confirm your payment information:</h2>
        </div>
        <div className="col-xs-6">
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div>
                <label htmlFor="type">Select type of payment:</label>
              </div>
              <div>
                <select name="type" className="form-control col-xs-2" onChange={this.handleChange}>
                  <option>{currentProfile.type}</option>
                  {this.toDisplayHide('type', 'cash', currentProfile )}
                </select>
              </div>
            </div>

            <div className="form-group">
              <div>
                <label htmlFor="name">Name on card:</label>
              </div>
              <div>
                <input name="name" type="text" className="form-control col-xs-6" value={currentProfile.name} onChange={this.handleChange} />
              </div>
            </div>

            <div className="form-group">
              <div>
                <label htmlFor="creditnumber">Card number:</label>
              </div>
              <div>
                <input name="creditnumber" type="text" value={currentProfile.creditnumber} className="form-control col-xs-6" onChange={this.handleChange} />
              </div>
            </div>

            <div className="form-group">
              <div>
                <label htmlFor="expiration">Expiration:</label>
              </div>

              <div>

                <input name="expiration" type="text" className="form-control col-xs-6" onChange={this.handleChange} value={currentProfile.expiration}/>
              </div>
            </div>

            <div className="form-group">
              <div>
                <label htmlFor="securitycode">Security code:</label>
              </div>
              <div>
                <input name="securitycode" type="text" className="form-control col-xs-6" value={currentProfile.securitycode} onChange={this.handleChange} />
              </div>
            </div>

            <div className="form-group">
              <div>
                <label htmlFor="zip">Zip Code:</label>
              </div>
              <div>
                <input name="zip" type="text" className="form-control col-xs-6" value= {currentProfile.zip} onChange={this.handleChange} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PopulatedPayment)
