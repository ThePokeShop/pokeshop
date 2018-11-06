import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {addToCart} from '../store'


const ProductCard = props => {
  const handleAddProduct = event => {
    event.preventDefault()
    props.addToCart(props.product, props.currentOrderId)
  }
    const {product} = props
    const ratingArr = []
    let averageRating
    let fixRating
    const isHidden = !product.visibleToUser
    if (product.reviews.length) {
      product.reviews.forEach(review => ratingArr.push(review.rating))
      if (ratingArr.length) {
        averageRating = ratingArr.reduce((a, b) => a + b) / ratingArr.length
        fixRating = averageRating.toFixed(2)
      }
    } else {
      fixRating = 'No rating'
    }
    return (
      <div className="tile" display="none">
        <NavLink to={`/products/${product.id}`}>
          <div className="card">
            <div className="card-image content is-centered">
              <figure className="image content is-centered is-96x96">
                <img src={product.imageUrl} alt="Placeholder image" />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4 is-centered">{product.title}</p>
                  <div className="content is-centered">ID: {product.id}</div>
                  <div className="content is-centered">
                    Price: <strong>{`$${product.price}`}</strong>
                  </div>
                  <div className="content is-centered">
                    Quantity: {product.stockQuantity}
                  </div>
                  <div className="content is-centered">
                    Category:{' '}
                    <strong>
                      {product.Category.map(
                        category => category.categoryType + ' '
                      )}
                    </strong>
                  </div>
                  <div className="content is-centered">
                    Rating: <strong>{fixRating}</strong>
                  </div>
                </div>
              </div>
            </div>
            {product.stockQuantity ? (
              <a className="button is-primary" onClick={handleAddProduct}>
                Add to Cart
              </a>
            ) : (
              <a className="button is-danger"  disabled>
                Out of Stock
              </a>
            )}
            {isHidden &&<div className="text is-danger">Hidden from user</div>}
          </div>
        </NavLink>
        
        

      </div>
    )
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = state => {
  return {
    currentOrderId: state.orders.currentOrderId
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addToCart: (product, currentOrderId) =>
      dispatch(addToCart(product, currentOrderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)


