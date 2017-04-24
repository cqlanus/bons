import React from 'react'
import { connect } from 'react-redux'

class AddArt extends React.Component {
  constructor() {
    super()
    this.state = {

    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    console.log(evt.target.value)
  }

  render() {
    return (
      <div>
      <form className="form-horizontal">
      <fieldset>
        <legend>Add Art</legend>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input type="text" className="form-control" />
        </div>

        <div className="form-group">
          <label>Cost</label>
          <div className="input-group">
            <span className="input-group-addon">$</span>
            <input type="number" step="0.01" className="form-control" />
          </div>
        </div>

        <div className="form-group">
          <label>Category</label>
          <input type="text" className="form-control" />
        </div>

        <div className="form-group">
          <label>Upload</label>
          <input type="file" name="img" accept="image/*" onChange={this.handleChange}/>
        </div>
      </fieldset>
      </form>
      </div>
    )
  }
}

const AddArtContainer = connect(null, null)(AddArt)

export default AddArtContainer
