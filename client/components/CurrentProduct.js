import React from 'react'
import ProductCard from './ProductCard'
import {connect} from 'react-redux'
import {fetchSingleProduct, fetchReview} from '../store'
import {Link} from 'react-router-dom'
import Review from './review'
//keep as class instead of function component, since we will be adding more function later
class CurrentProduct extends React.Component {
  async componentDidMount() {
    const productId = this.props.match.params.productId
    if (productId == Number(productId)) {
      await this.props.fetchSingleProduct(productId)
      await this.props.fetchReview(productId)
    }
  }
  render() {
    const productId = this.props.match.params.productId
    if (productId != Number(productId)) {
      return <div>404</div> //<Notfound/>
    }
    const {currentProduct, reviews} = this.props

    if (!currentProduct.title) {
      return <div>Loading...</div>
    } else {
      const ratingArr = []
      let averageRating
      let fixedRating
      if (reviews.length) {
        reviews.forEach(review => ratingArr.push(review.rating))
        if (ratingArr.length) {
          averageRating = ratingArr.reduce((a, b) => a + b) / ratingArr.length
          fixedRating = averageRating.toFixed(2)
        }
      } else {
        fixedRating = 'No rating yet'
      }
      return (
        <div>
          <div className="tile is-parent">
            <div className="section container">
              <article className="media">
                <figure className="media-left">
                  <p className="image is-128x128">
                    <img src={currentProduct.imageUrl} />
                  </p>
                  <button className="delete" type="button" />
                  <Link to={`/products/${productId}/edit`}>
                    <a className="button is-primary">Edit Product</a>
                  </Link>
                </figure>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <h2>
                        <strong>{currentProduct.title}</strong>
                      </h2>
                    </p>
                    <p>
                      Product Id: <strong>{currentProduct.id}</strong>
                    </p>
                    <p>
                      Quantity:
                      <strong>{currentProduct.stockQuantity} </strong>
                    </p>
                    <p>
                      Rating:
                      <strong>{fixedRating} </strong>
                    </p>
                  </div>
                  <div className="content is-centered">
                    Category:{' '}
                    <strong>
                      {currentProduct.Category.map(
                        category => category.categoryType + ' '
                      )}
                    </strong>
                  </div>

                  <p>
                    Description:
                    <strong>{currentProduct.description}</strong>
                  </p>
                </div>
                <div className="media-right">
                  <div className="pricebox">
                    <div className="card-image content is-centered">
                      <p className="title is-4 is-centered">
                        {' '}
                        Pirce: ${currentProduct.price}
                      </p>
                    </div>
                    <div className="card-content is-centered">
                      <div className="media">
                        <div className="media-content container is-centered">
                          {currentProduct.stockQuantity ? (
                            <a
                              className="button is-primary"
                              onClick={this.addProductOnClick}
                            >
                              Add to Cart
                            </a>
                          ) : (
                            <a
                              className="button is-danger"
                              onClick={this.addProductOnClick} disabled
                            >
                              Out of Stock
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div className="tile is-parent">
            <strong>Reviews: </strong>
            <div className="section container">
              <Review reviews={reviews} currentProduct={currentProduct} />
            </div>
          </div>
        </div>
      )
    }
  }
}
const mapStateToProps = state => {
  return {
    currentProduct: state.currentProduct,
    reviews: state.review
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
    fetchReview: id => dispatch(fetchReview(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CurrentProduct)
