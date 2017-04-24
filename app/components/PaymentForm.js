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
    console.log('in handleProfile Change')
    console.log('this', this)
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
                <label htmlFor="type">Select payment profile:</label>
              </div>
              <div>
                <select name="profile" className="form-control col-xs-2" onChange={this.handleProfileChange}>
                  <option>Enter new payment information</option>
                  {this.props.payment.payment_profiles.map((paypro=>{
                    return (<option key={paypro.id} value={parseInt(paypro.id)}> {paypro.name+' '+ '('+paypro.creditnumber.slice(-4)+')'} </option>)
                  }))}}
                </select>
              </div>
            </div>

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
                <label htmlFor="typeOfCard">Card type:</label>
              </div>
              <div>
                <select name="paymentType" className="form-control col-xs-2" onChange={this.handleChange}>
                  <option>Visa</option>
                  <option>MasterCard</option>
                  <option>Chase</option>
                  <option>American Express</option>
                  <option>Discover</option>
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
              <button type="submit" className="btn btn-danger pull-right">Purchase</button>

              <Link to="/checkout/shipping"><button className="btn btn-success">Back</button></Link>
            </div>

          </form>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm)
