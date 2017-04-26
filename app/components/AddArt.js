import React from 'react'
import { connect } from 'react-redux'
import { postProduct, postS3Img } from '../reducers/products'
import Dropzone from 'react-dropzone'


const mapStateToProps = (state) => ({
  // user: state.user
  me: state.auth
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
      name: '',
      description: '',
      unitPrice: 0.01,
      img: 'http://i.imgur.com/XDjBjfu.jpg',
      categories: [],
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDrop = this.handleDrop.bind(this)

    this.checkHandleChange = this.checkHandleChange.bind(this)
  }

  checkHandleChange(evt) {
    var categoryId = evt.target.value
    var currentCategories = this.state.categories
    var index = currentCategories.indexOf(categoryId)
    if (index === -1) {
      var newStateCategories = [...currentCategories, categoryId]
    } else {
      newStateCategories = currentCategories.splice(index, 1)
    }
    this.setState({
      categories: newStateCategories,
    })
    // console.log("UPDATED LOCAL STATE IS", this.state)
  }

  handleChange(evt) {
    var type = evt.target.name
    var value = evt.target.value
    this.setState({
      [type]: value,
    })
    // console.log("UPDATED LOCAL STATE IS", this.state)
  }

  handleDrop(evt) {
    console.log(evt.target.files[0])
    Promise.resolve(postS3Img(evt.target.files))
      .then(url => {
        this.setState({
          img: url
        })
      })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    console.log('THIS.PROPS', this.props)
    this.props.postProduct({...this.state, user_id: this.props.me.id})
  }

  render() {
    return (
      <div className="container">
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
      <fieldset>
        <legend>Add Art</legend>
        <div className="form-group">
          <label>Title</label>
          <input name="name" type="text" className="form-control" onChange={this.handleChange}/>
        </div>

        <div className="form-group">
          <label>Description</label>
          <input name="description" type="text" className="form-control" onChange={this.handleChange}/>
        </div>

        <div className="form-group">
          <label>Cost</label>
          <div className="input-group">
            <span className="input-group-addon">$</span>
            <input name="unitPrice" type="number" min="0" step="0.01" className="form-control" onChange={this.handleChange}/>
          </div>
        </div>

        {/* <div className="form-group">
          <label>Category</label>
          <input name="category" type="text" className="form-control" />
        </div> */}

        <div className="form-group">
          <label>Select all categories that apply:</label>
        </div>
        <div>
          <input type="checkbox" name="categories" value="1" onChange={this.checkHandleChange}/>
          <label>Drawing</label>
        </div>
        <div>
          <input type="checkbox" name="categories" value="2" onChange={this.checkHandleChange}/>
          <label>Painting</label>
        </div>
        <div>
          <input type="checkbox" name="categories" value="3" onChange={this.checkHandleChange}/>
          <label>Digital</label>
        </div>
        <div>
          <input type="checkbox" name="categories" value="4" onChange={this.checkHandleChange}/>
          <label>Jewlery</label>
        </div>
        <div>
          <input type="checkbox" name="categories" value="5" onChange={this.checkHandleChange}/>
          <label>Home Decor</label>
        </div>
        <div>
          <input type="checkbox" name="categories" value="6" onChange={this.checkHandleChange}/>
          <label>Photograph</label>
        </div>
        <div>
          <input type="checkbox" name="categories" value="7" onChange={this.checkHandleChange}/>
          <label>Mixed Media</label>
        </div>

        <input type="hidden" name="img" value="/public/horse.png" />

        <div className="form-group">
          <label>Upload</label>
          {/*<Dropzone onDrop={this.handleDrop} size={150} >
            <div>Drop some files here!
            </div>
          </Dropzone>*/}
          <input type="file" name="imgS3" accept="image/*" onChange={this.handleDrop}/>
        </div>
        <div>
          <button type="submit" className="btn btn-danger pull-right">Submit</button>
        </div>
      </fieldset>
      </form>
      </div>
    )
  }
}

const AddArtContainer = connect(mapStateToProps, mapDispatchToProps)(AddArt)

export default AddArtContainer
