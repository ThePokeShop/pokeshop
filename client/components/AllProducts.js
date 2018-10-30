import React from 'react'
import ProductCard from './ProductCard'
import {connect} from 'react-redux'


//keep as class instead of function component, since we will be adding more function later
class AllProducts extends React.Component {
  render() {
    const {products} = this.props
    if (products.length === 0) {
      return <div>No Products</div>
    } else {
      return (
          //Still need to change CSS!!
        <div className="need to add">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )
    }
  }
}
const mapStateToProps = ({products}, ownProps) => {
  return {products}
}

export default connect(mapStateToProps)(AllProducts)
