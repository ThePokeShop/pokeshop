import React from 'react'
import ProductCard from './ProductCard'
import { connect } from 'react-redux'
import CategoryPanel from './CategoryPanel'
import { fetchProducts } from '../store/index';
import { destroySearch, searchedProduct } from '../store/searchProducts'

//keep as class instead of function component, since we will be adding more function later
class SearchProductView extends React.Component {
  state = {
    value: ''
  }
  componentDidMount() {
    this.props.fetchProducts();
  }
  componentDidUpdate() {

    if (this.state.value !== this.props.location.search.slice(5)) {
      this.props.searchedProduct(this.props.location.search.slice(5))
      this.setState({ value: this.props.location.search.slice(5) })
    }

  }
  filterProduct = () => {
    let filter = []
    // this.props.searchedProduct(this.props.location.search.slice(5))
    // console.log('this is my filter', typeof this.props.location.search.slice(5))
    let obj = Object.keys(this.props.searchProduct)
    if (obj.length) {
      this.props.searchProduct.forEach(product => {
        for (let i = 0; i < product.Category.length; i++) {
          let cat = product.Category[i]
          if (this.props.categoriesAreSelected[cat.id]) {
            filter.push(product)
            return
          }
        }
      })
    }
    return filter
  }

  render() {

    const filterProduct = this.filterProduct()
    if (filterProduct.length === 0) {
      return (
        <div className="main-content columns is-fullheight">
          <CategoryPanel />
          <div className="container column">
            <div>No Products</div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="main-content columns is-fullheight">
          <CategoryPanel />
          <div className="container column">
            <div className="tile is-ancestor" style={{ "flexwrap": 'row' }}>
              {filterProduct.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )
    }
  }
}
const mapStateToProps = ({ products, categories, categoriesAreSelected, searchProduct }) => {
  return { products, categories, categoriesAreSelected, searchProduct }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    destroySearch: () => dispatch(destroySearch()),
    searchedProduct: (item) => dispatch(searchedProduct(item))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchProductView)
