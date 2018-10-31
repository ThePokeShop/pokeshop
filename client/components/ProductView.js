import React from 'react'
import ProductCard from './ProductCard'
import { connect } from 'react-redux'
import CategoryPanel from './CategoryPanel'

//keep as class instead of function component, since we will be adding more function later
class ProductView extends React.Component {

  filterProduct = () => {
    let filter = []
    this.props.products.forEach(product => {
      for (let i = 0; i < product.Category.length; i++) {
        let cat = product.Category[i]
        if (this.props.categoriesAreSelected[cat.id]) {
          filter.push(product)
          return
        }
      }
    })
    console.log('--->>>', filter)
    return filter
  }

  render() {

    const { products, categories, categoriesAreSelected } = this.props
    if (products.length === 0) {
      return <div>No Products</div>
    } else {
      const filterProduct = this.filterProduct()
      return (
        <div>
          <CategoryPanel />
          <div className="section tile is-ancestor">
            {filterProduct.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )
    }
  }
}
const mapStateToProps = ({ products, categories, categoriesAreSelected }, ownProps) => {
  return { products, categories, categoriesAreSelected }
}


export default connect(mapStateToProps)(ProductView)
