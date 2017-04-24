import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { updateProfile } from '../reducers/auth'

class DashboardEdit extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    if ((this.state.password || this.state.confirmPassword) &&
        (this.state.password !== this.state.confirmPassword)) {
      console.log('passwords do not match - alert user and return')
      alert('Passwords need to match')
      return
    }
    console.log('passwords match - go ahead and send a put request')
    const updates = this.createUpdates(this.state)
    this.props.updateUser(updates)
  }

  createUpdates(obj) {
    const keys = Object.keys(obj)
    const output = {}
    keys.forEach(key => {
      if (obj[key]) {
        output[key] = obj[key]
      }
    })
    console.log(output)
    return output
  }

  render() {
    return (
    <div className="row">
    <div className="col-xs-6">
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Edit Profile</legend>
          <div className="form-group">
            <label className="">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>

          <div className="form-group">
            <label className="">Email</label>
            <input
              type="email"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>

          <div className="form-group">
            <label className="">New Password</label>
            <input
              type="password"
              name="password"
              pattern=".{6,}" title="Six or more characters"
              className="form-control"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label className="">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              pattern=".{6,}" title="Six or more characters"
              className="form-control"
              onChange={this.handleChange}
            />
          </div>

          <Link to="/dashboard"><button className="btn btn-success">Back</button></Link>
          <button className="btn btn-success pull-right" type="submit">Save</button>
        </fieldset>

      </form>
      </div>
    </div>
    )
  }
}

const MapDispatch = dispatch => ({
  updateUser(updates) {
    dispatch(updateProfile(updates))
  }
})

const DashboardEditContainer = connect(null, MapDispatch)(DashboardEdit)

export default DashboardEditContainer
