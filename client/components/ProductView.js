import React from 'react'
import ProductCard from './ProductCard'
import {connect} from 'react-redux'
import CategoryPanel from './CategoryPanel'
import {fetchPaginatedProducts} from '../store/index'
import PageSelector from './PageSelector'

//keep as class instead of function component, since we will be adding more function later
class ProductView extends React.Component {
  state = {loading: true}

  async componentDidMount() {
    const urlParamStr = this.props.location.search.slice(1)
    await this.props.fetchPaginatedProducts(urlParamStr)
    this.setState({loading: false})
  }

  componentDidUpdate = async prevProps => {
    if (this.props.location !== prevProps.location) {
      const urlParamStr = this.props.location.search.slice(1)
      this.setState({loading: true})
      await this.props.fetchPaginatedProducts(urlParamStr)
      this.setState({loading: false})
    }
  }

  filterProduct = products => {
    let filter = []
    let productCount = Object.keys(products)
    if (productCount.length) {
      products.forEach(product => {
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
    const loading = this.state.loading
    if (loading) {
      return (
        <div className="main-content columns is-fullheight">
          <CategoryPanel />
          <div className="container column">
            <div className="is-3">Loading...</div>
          </div>
        </div>
      )
    }
    const paginatedProducts = this.props.paginatedProducts
    const filterProduct = this.filterProduct(paginatedProducts.products)
    if (filterProduct.length === 0) {
      return (
        <div className="main-content columns is-fullheight">
          <CategoryPanel key = "no-products"/>
          <div className="container column">
            <div>No Products</div>
          </div>
        </div>
      )
    }
    const {page, pageCount, limit, key, products, count} = paginatedProducts
    const offset = (page - 1) * limit;
    const startProdNum = offset + 1
    const endProdNum = offset + products.length;
    const foundResultsMessage = `Found ${count} products. Displaying results ${startProdNum} to ${endProdNum}`
    return (
      <div className="main-content columns is-fullheight">
        <CategoryPanel key="products-loaded"/>
        <div className="container column">
          <div className="container">
            <PageSelector />
            <div className="container">
              <p className="is-size-5 has-text-left">{foundResultsMessage}</p>
            </div>
            <div
              className="section tile is-ancestor"
              style={{flexwrap: 'row'}}
            >
              {filterProduct.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({categoriesAreSelected, paginatedProducts}) => {
  return {
    categoriesAreSelected,
    paginatedProducts
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchPaginatedProducts: queryObj =>
      dispatch(fetchPaginatedProducts(queryObj))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductView)
