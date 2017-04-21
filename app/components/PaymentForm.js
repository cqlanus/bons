import React from 'react'
import { connect } from 'react-redux'
import { putOrder } from '../reducers/orders'
import { browserHistory, Link } from 'react-router'
// import { putPayment } from '../reducers/payment' /// correct this

const mapStateToProps = (state) => ({
  // user: state.user
})

const mapDispatchToProps = {
  // putPayment: putPayment
}

export class PaymentForm extends React.Component {
  constructor() {
    super()
    this.state = {
      type: '',
      typeOfCard: '',
      name: '',
      creditnumber: '',
      expiration: '',
      // month: '',
      // year: '',
      securitycode: '',
      zip: '',
    }
    this.handleChange = this.handleChange.bind(this)
    // this.handleExpChange = this.handleExpChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.smooshExpDate = this.smooshExpDate.bind(this)
  }

  handleChange(evt) {
    // console.log(this.state)
    const type = evt.target.name
    const value = evt.target.value
    this.setState({
      [type]: value
    })
    console.log(this.state)
  }
  //  // ATTEMPT TO USE TWO SELECT FIELDS TO SET THE EXPDATE ON STATE

  // handleExpChange(evt) {
  //   const type = evt.target.name
  //   const value = evt.target.value
  //   console.log('TYPE AND VALUE', type, value)
  //   this.setState({
  //     [type]: value
  //   })
  //   console.log('BEFORE SMOOSH', this.state.expDate)
  //   this.smooshExpDate()
  // }

  // smooshExpDate() {
  //   console.log(this.state)
  //   console.log('MONTH:', this.state.month)
  //   console.log('YEAR:', this.state.year)
  //   const fullDate = this.state.month + '/' + this.state.year
  //   this.setState({
  //     expDate: fullDate
  //   })
  //   console.log('expDate on state is:', this.state.expDate)
  // }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.putPayment(this.state)
    console.log('handle submit sending this state', this.state)
  }

  render() {
    return (
      <div>
        <div>
          <div>

          </div>
          <h2>Please enter your payment information:</h2>
        </div>
        <div>
          <form className="form-horizontal" onSubmit={this.handleSubmit}>

            <div className="form-group">
              <div>
                <label htmlFor="type">Select type of payment:</label>
              </div>
              <div className="col-xs-6">
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
              <div className="col-xs-6">
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
              <div className="col-xs-6">
                <input name="name" type="text" className="form-control col-xs-6" onChange={this.handleChange} />
              </div>
            </div>

            <div className="form-group">
              <div>
                <label htmlFor="creditnumber">Card number:</label>
              </div>
              <div className="col-xs-6">
                <input name="creditnumber" type="text" className="form-control col-xs-6" onChange={this.handleChange} />
              </div>
            </div>

            <div className="form-group">
              <div>
                <label htmlFor="expiration">Expiration:</label>
              </div>
              <div className="col-xs-6">
                <input name="expiration" type="text" className="form-control col-xs-6" onChange={this.handleChange} placeholder="MM/YYYY"/>
              </div>
            </div>

            {/* <div>-</div>

              //////COULDN'T GET THIS TO WORK...
            <div className="form-group">
              <div>
                <label htmlFor="expDate">Expiration:</label>
              </div>
              <div className="col-xs-6">
                  <select name='month' onChange={this.handleChange}>
                      <option value=''>Month</option>
                      <option value='01'>01</option>
                      <option value='02'>02</option>
                      <option value='03'>03</option>
                      <option value='04'>04</option>
                      <option value='05'>05</option>
                      <option value='06'>06</option>
                      <option value='07'>07</option>
                      <option value='08'>08</option>
                      <option value='09'>09</option>
                      <option value='10'>10</option>
                      <option value='11'>11</option>
                      <option value='12'>12</option>
                  </select><span> / </span>
                  <select name='year' onChange={this.handleChange}>
                      <option value=''>Year</option>
                      <option value='17'>17</option>
                      <option value='18'>18</option>
                      <option value='19'>19</option>
                      <option value='20'>20</option>
                      <option value='21'>21</option>
                  </select>
                </div>
            </div> */}

            <div className="form-group">
              <div>
                <label htmlFor="securitycode">Security code:</label>
              </div>
              <div className="col-xs-6">
                <input name="securitycode" type="text" className="form-control col-xs-6" onChange={this.handleChange} /><span><h5>What is this? FIX FORMATTING</h5></span>
              </div>
            </div>

            <div className="form-group">
              <div>
                <label htmlFor="zip">Zip Code:</label>
              </div>
              <div className="col-xs-6">
                <input name="zip" type="text" className="form-control col-xs-6" onChange={this.handleChange} />
              </div>
            </div>

            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-primary">submit</button><span>MAKE THIS REDIRECT TO CONFIRMATION PAGE ONCE IT EXISTS</span>
            </div>

          </form>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm)
