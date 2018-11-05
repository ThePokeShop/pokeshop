import React from 'react'
import ProductCard from './ProductCard'
import {connect} from 'react-redux'
import CategoryPanel from './CategoryPanel'
// import { fetchProducts } from '../store/index';
import {fetchPaginatedProducts} from '../store/index'
import { Link } from 'react-router-dom'
// import { destroySearch } from '../store/searchProducts'


//keep as class instead of function component, since we will be adding more function later
class ProductView extends React.Component {
  state = {loading: true}
  async componentDidMount() {
    // const queryObj = {}
    const urlParamStr = this.props.location.search.slice(1) // get params from URL
    // const urlParamArr = urlParamStr.split('&') // split into array
    // urlParamArr.forEach(param => {
    //   // loop over each parameter
    //   const idxEqlSign = param.indexOf('=')
    //   // end this loop if eqls sign not found, or at ends
    //   if (idxEqlSign < 1 || idxEqlSign === param.length - 1) return undefined
    //   const paramName = param.slice(0, idxEqlSign)
    //   const paramVal = param.slice(idxEqlSign + 1)
    //   queryObj[paramName] = paramVal // push params into queryObj
    // })
    await this.props.fetchPaginatedProducts(urlParamStr)
    this.setState({loading: false})
  }

  componentDidUpdate = async (prevProps) => {
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
    const paginatedProducts = this.props.paginatedProducts
    const filterProduct = this.filterProduct(paginatedProducts.products)
    const loading = this.state.loading;
    if (loading) return (
      <div className="main-content columns is-fullheight">
          <CategoryPanel />
          <div className="container column">
            <div className="is-3">Loading...</div>
          </div>
        </div>
    )
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
            <div className="container">
              {this.renderPageSelect()}
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
  renderPageSelect() {
    const {page, limit, pageCount, key} = this.props.paginatedProducts
    if (pageCount < 1) return null
    let paramUrl = '/products?'
    if (key) paramUrl += `key=${key}&`;
    paramUrl += `limit=${limit}&page=`;
    const prevPageUrl = `${paramUrl}${page-1}`;
    const nextPageUrl = `${paramUrl}${page+1}`;
    return (
      <nav className="pagination" role="navigation" aria-label="pagination">
        {page > 1 && (<Link to={prevPageUrl} className="pagination-previous">
          Previous
        </Link>)}
        {page < pageCount && (<Link to={nextPageUrl} className="pagination-next">
          Next
        </Link>)}
        <ul className="pagination-list">
          {new Array(pageCount).fill('').map((_, idx) => {
            const pageNum = idx + 1
            const isCurrent = (page === pageNum) ? 'is-current' : null;
            const ariaLabel = (isCurrent) ? `Page ${pageNum}` : `Goto page ${pageNum}`;
            const paramUrlWithNum = `${paramUrl}${pageNum}`
            return (
              <li key={pageNum}>
                <Link to={paramUrlWithNum} className={`pagination-link ${isCurrent}`} aria-label={ariaLabel}>
                  {pageNum}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }
}
const mapStateToProps = ({
  products,
  categories,
  categoriesAreSelected,
  searchProduct,
  paginatedProducts
}) => {
  return {
    products,
    categories,
    categoriesAreSelected,
    searchProduct,
    paginatedProducts
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchPaginatedProducts: queryObj =>
      dispatch(fetchPaginatedProducts(queryObj))
    // destroySearch: () => dispatch(destroySearch())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductView)
