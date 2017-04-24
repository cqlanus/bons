import React from 'react'
import { connect } from 'react-redux'
import { postProduct } from '../reducers/products'


const mapStateToProps = (state) => ({
  // user: state.user
})

const mapDispatchToProps = {
    postProduct: postProduct,
}




class AddArt extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      unitPrice: 0.01,
      categories: [],
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.checkHandleChange = this.checkHandleChange.bind(this)
  }

  checkHandleChange(evt){
    var categoryId = evt.target.value
    var currentCategories = this.state.categories
    var index = currentCategories.indexOf(categoryId)
    if(index === -1){
      var newStateCategories = [...currentCategories, categoryId]
    } else {
      var newStateCategories = currentCategories.splice(index, 1)
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

  handleSubmit(evt){
    evt.preventDefault()
    console.log("THIS.PROPS", this.props)
    this.props.postProduct(this.state)
  }

  render() {
    return (
      <div>
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




        <div className="form-group">
          <label>Upload</label>
          <input type="file" name="img" accept="image/*" onChange={this.handleChange}/>
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
