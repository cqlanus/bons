import React from 'react'

class FilterInput extends React.Component {
  constructor() {
    super()
    this.state = {
      inputValue: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.filter = this.filter.bind(this)
  }

  handleChange(evt) {
    this.setState({
      inputValue: evt.target.value
    })
  }

  filter(evt) {
    evt.preventDefault()
    console.log('inputvalue', this.state.inputValue)
    const filteredProducts = this.state.inputValue ? this.props.products.filter(product => product.name.match(this.state.inputValue)) : this.props.getAllProducts()
    this.props.resetProducts(filteredProducts)
    this.setState({
      inputValue: ''
    })
  }

  render() {
    return (
      <form className='form-group' onSubmit={this.filter} style={{marginTop: '10px'}}>
        <div className="input-group">
          <input
            onChange={this.handleChange}
            value={this.state.inputValue}
            className='form-control input-sm'
            placeholder="Enter art name"
          />
          <div className="input-group-btn">
            <button className="btn btn-default" type="submit">Submit</button>
          </div>
        </div>
      </form>
    )
  }
}

export default FilterInput
