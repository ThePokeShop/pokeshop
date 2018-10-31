import React from 'react'

import ProductCard from './ProductCard'
import {connect} from 'react-redux';
import {fetchSingleProduct} from '../store';
import {Link} from 'react-router-dom'

//keep as class instead of function component, since we will be adding more function later
class CurrentProduct extends React.Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.fetchSingleProduct(productId)
  }

  render() {
    const productId = this.props.match.params.productId
    const {currentProduct} = this.props;
    if (!currentProduct.title) {
      return <div>Loading...</div>
    } else {
      return (
          //Still need to change CSS!!
        <div className="section container">
           <ProductCard product={currentProduct}/>
           <Link to={`/products/${productId}/edit`} >Edit this Product</Link>
        </div>

      )
    }
  }
}

const mapStateToProps = state => {
  return {
    currentProduct: state.currentProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentProduct)
