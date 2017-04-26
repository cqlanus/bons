import React from 'react'
import ProductPanel from './ProductPanel'
import { connect } from 'react-redux'
import { filterProducts } from '../reducers/products'


const mapStateToProps = (state) => ({
  products: state.products.products,
  filteredProducts: state.products.filteredProducts
})

// const mapDispatchToProps = {
//     filterProducts: filterProducts
// }

const mapDispatchToProps = dispatch => ({
  filterProducts(selectedCat) {
    dispatch(filterProducts(selectedCat))
  }
})

function handleChange(evt){
  const selectedCat = evt.target.value;
  console.log("IN HANDLECHANGE", selectedCat)
  filterProducts(selectedCat)
}

const allProducts = (props) => {

  function handleChange(evt){
    const selectedCat = evt.target.value;
    console.log("IN HANDLECHANGE", selectedCat)
    props.filterProducts(selectedCat)
  }



  return(
    <div>
      <div className="mainTitle">
        <h1 className="big fancy">M</h1><h1>a</h1><h1>s</h1><h1>t</h1><h1>e</h1><h1>r</h1><h1>p</h1><h1>i</h1><h1>e</h1><h1>c</h1><h1>e</h1><h1>s</h1><h1 className="no"> at </h1><h1>Bons</h1>
        <span className="catSelect pull-right">Choose a product type</span>
        <select className="pull-right" onChange={handleChange}>
          <option value="1">Drawing</option>
          <option value="2">Painting</option>
          <option value="3">Digital</option>
          <option value="4">Jewelry</option>
          <option value="5">Home Decor</option>
          <option value="6">Photograph</option>
          <option value="7">Mixed Media</option>
        </select>
        <hr></hr>
      </div>

      <div className="art container">
        {
          // console.log("PROPS TO PRODUCTSLIST", props.products)
        props.products.map(function(product) {
          return (
            <div className="col-xs-4 indivArt" key={product.id}>
                <ProductPanel product={product}/>
            </div>
          )
        }) /*: 'Sorry, No Products!'*/

      }
    </div>
  </div>
)}

export default connect(mapStateToProps, mapDispatchToProps)(allProducts)
