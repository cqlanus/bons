import React from 'react'
import { connect } from 'react-redux'
import { postProduct, postS3Img } from '../reducers/products'
import Dropzone from 'react-dropzone'

const mapStateToProps = (state) => ({
  // user: state.user
})

const mapDispatchToProps = dispatch => ({
  // putPayment: putPayment
  postProduct(product) {
    dispatch(postProduct(product))
  },
})

class AddArt extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      unitPrice: 0.01,
      category: '',
      img: 'test123',
      imgS3: {},
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    var type = evt.target.name
    var value = evt.target.value
    if (evt.target.files) {
      this.setState({
        imgS3: evt.target.files[0]
      })
    } else {
      this.setState({
        [type]: value,
      })
    }
  }

  handleDrop(files) {
    console.log(files)
    postS3Img(files)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    console.log('submitted', this.state.imgS3)
  }

  render() {
    return (
      <div>
      <form className="form-horizontal" encType="multipart/form-data" onSubmit={this.handleSubmit}>
      <fieldset>
        <legend>Add Art</legend>
        <div className="form-group">
          <label>Title</label>
          <input name="title" type="text" className="form-control" onChange={this.handleChange}/>
        </div>

        <div className="form-group">
          <label>Description</label>
          <input name="description" type="text" className="form-control" onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <label>Cost</label>
          <div className="input-group">
            <span className="input-group-addon">$</span>
            <input name="unitPrice" type="number" step="0.01" className="form-control" onChange={this.handleChange} />
          </div>
        </div>

        {/* <div className="form-group">
          <label>Category</label>
          <input name="category" type="text" className="form-control" />
        </div> */}




        <div className="form-group">
          <label>Upload</label>
          <Dropzone onDrop={this.handleDrop} size={150} >
            <div>Drop some files here!
            </div>
          </Dropzone>
          <input type="file" name="imgS3" accept="image/*" onChange={this.handleChange}/>
        </div>

        <button className="btn btn-primary" type="submit">Submit</button>
      </fieldset>
      </form>
      </div>
    )
  }
}

const AddArtContainer = connect(null, mapDispatchToProps)(AddArt)

export default AddArtContainer
