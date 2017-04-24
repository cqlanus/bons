import React from 'react'
import { connect } from 'react-redux'


const mapStateToProps = (state) => ({
  // user: state.user
})

const mapDispatchToProps = {
  // putPayment: putPayment
}




class AddArt extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      unitPrice: 0.01,
      category: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    console.log(evt.target.value)
    var type = evt.target.name
    var value = evt.target.value
    this.setState({
      [type]: value,
    })
  }

  handleSubmit(evt){
    evt.preventDefault()


  }

  render() {
    return (
      <div>
      <form className="form-horizontal">
      <fieldset>
        <legend>Add Art</legend>
        <div className="form-group">
          <label>Title</label>
          <input name="title" type="text" className="form-control" />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input name="description" type="text" className="form-control" />
        </div>

        <div className="form-group">
          <label>Cost</label>
          <div className="input-group">
            <span className="input-group-addon">$</span>
            <input name="unitPrice" type="number" step="0.01" className="form-control" />
          </div>
        </div>

        {/* <div className="form-group">
          <label>Category</label>
          <input name="category" type="text" className="form-control" />
        </div> */}




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
