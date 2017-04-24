import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { postComment, postRating } from '../reducers/comments'

class AddReview extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      comment: '',
      rating: '',
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
    // post a comment
    const review = {
      comment: this.state.comment,
      user_id: this.props.me.id,
      product_id: this.props.product.id,
      rating: parseInt(this.state.rating)
    }
    console.log(review)
    this.props.postReview(review)
    // post a review
    browserHistory.push(`/products/${this.props.product.id}`)
  }

  render() {
    const product = this.props.product
    const me = this.props.me
    return (
      <div>
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
      <fieldset>
        <legend>Add Review for {product.name}</legend>
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" className="form-control" onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <label>Rating</label>
          <select name="rating" className="form-control" onChange={this.handleChange}>
            <option value=""></option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div className="form-group">
          <label>Review {me ? 'by ' + me.name : null}</label>
          <input type="text" name="comment" className="form-control" onChange={this.handleChange} />
        </div>

        <Link to={`/products/${product.id}`}><button className="btn btn-success">Back</button></Link>
        <button type="submit" className="btn btn-success pull-right">Submit</button>

      </fieldset>
      </form>
      </div>
    )
  }
}

const MapState = state => ({
  product: state.products.selectedProduct,
  me: state.auth
})

const MapDispatch = dispatch => ({
  postReview(comment) {
    if (comment.comment) {
      dispatch(postComment(comment))
    }

    if (comment.rating) {
      dispatch(postRating(comment))
    }
  },
})

const AddReviewContainer = connect(MapState, MapDispatch)(AddReview)

export default AddReviewContainer
