import React from 'react'
import ProductCard from './ProductCard'
import { connect } from 'react-redux'
import CategoryPanel from './CategoryPanel'
//keep as class instead of function component, since we will be adding more function later
class ProductView extends React.Component {
  state = {
    checkObj: {}
  }
  handleCheck = event => {
    console.log('----->>>evt', event.target.name)
    const id = event.target.name
    const prevStateCheckObj = { ...this.state.checkObj }
    const prevValue = prevStateCheckObj[id]
    this.setState({
      checkObj: {
        ...prevStateCheckObj, [id]: !prevValue
      }
    })
  }
  render() {
    const { products, categories } = this.props
    if (products.length === 0) {
      return <div>No Products</div>
    } else {
      return (
        <div>
          <CategoryPanel handleCheck={this.handleCheck} checkObj={this.state.checkObj} categories={categories} />
          <div className="section tile is-ancestor">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )
    }
  }
}
const mapStateToProps = ({ products, categories }, ownProps) => {
  return { products, categories }
}

export default connect(mapStateToProps)(ProductView)
