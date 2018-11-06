import React from 'react'
import ProductCard from './ProductCard'
import {connect} from 'react-redux'
import CategoryPanel from './CategoryPanel'
import {fetchPaginatedProducts, selectCategoriesWithArray} from '../store/index'
import PageSelector from './PageSelector'
//keep as class instead of function component, since we will be adding more function later
class ProductView extends React.Component {
  state = {loading: true}

  async componentDidMount() {
    const urlParamStr = this.props.location.search.slice(1)
    await this.props.fetchPaginatedProducts(urlParamStr) // fetch results using URL
    let catIds = this.props.paginatedProducts.catIds;
    if (catIds) {
      this.props.selectCategoriesWithArray(catIds)
    }
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

  render() {
    const loading = this.state.loading
    if (loading) {
      return (
        <div className="main-content columns is-fullheight">
          <CategoryPanel {...this.props}/>
          <div className="container column">
            <div className="is-3">Loading...</div>
          </div>
        </div>
      )
    }
    const paginatedProducts = this.props.paginatedProducts
    const {page, pageCount, limit, key, products, count, catIds} = paginatedProducts
    if (paginatedProducts.products.length === 0) {
      return (
        <div className="main-content columns is-fullheight">
          <CategoryPanel searchKey={key} location={this.props.location} history={this.props.history} />
          <div className="container column">
            <div>No Products</div>
          </div>
        </div>
      )
    }
    const offset = (page - 1) * limit;
    const startProdNum = offset + 1
    const endProdNum = offset + products.length;
    const foundResultsMessage = `Found ${count} products. Displaying results ${startProdNum} to ${endProdNum}`
    return (
      <div className="main-content columns is-fullheight">
        <CategoryPanel location={this.props.location} searchKey={key} history = {this.props.history}/>
        <div className="container column">
          <div className="container">
            <PageSelector />
            <div className="container">
              <p className="is-size-5 has-text-left">{foundResultsMessage}</p>
            </div>
            <div id='listOfPokemons' className="section tile is-ancestor"  >
              {this.props.user.isAdmin ? products.map(product => (
                <ProductCard key={product.id} product={product} />
              )):(products.filter(product => (product.visibleToUser))
                .map(product => (
                <ProductCard key={product.id} product={product} />
              )))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({categoriesAreSelected, paginatedProducts, user}) => {
  return {
    categoriesAreSelected,
    paginatedProducts,
    user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchPaginatedProducts: queryObj =>
      dispatch(fetchPaginatedProducts(queryObj)),
    selectCategoriesWithArray: catIds => dispatch(selectCategoriesWithArray(catIds))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductView)
