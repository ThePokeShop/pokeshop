import React from 'react'
import ProductCard from './ProductCard'
import { connect } from 'react-redux'
import CategoryPanel from './CategoryPanel'
import { fetchProducts } from '../store/index';
import { destroySearch } from '../store/searchProducts'
//keep as class instead of function component, since we will be adding more function later
class ProductView extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  filterProduct = () => {
    let filter = []
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
    } else {
      this.props.products.forEach(product => {
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
          <div className="container column is-multiline">
            <div id='listOfPokemons' className="tile is-ancestor" >
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
    destroySearch: () => dispatch(destroySearch())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductView)
