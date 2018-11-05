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
  async componentDidUpdate(prevProps){
    const productId = this.props.match.params.productId
    if(this.props.reviews.length !== prevProps.reviews.length){
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
      reviews.forEach(review => ratingArr.push(review.rating))
      const averageRating = ratingArr.reduce((a,b) => (a + b)/ratingArr.length)
      const fixedRating =averageRating.toFixed(2)
      return (
        <div>
      <div className="tile is-parent">
        <div className="section container">
          <article className="media">
            <figure className="media-left">
              <p className="image is-128x128">
                <img src={currentProduct.imageUrl} />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{currentProduct.title}</strong>
                </p>
                <p>
                  <small>Product Id: </small> <strong>{currentProduct.id}</strong>
                </p>
                <p>
                  <small>Quantity:  </small>
                  <strong>{currentProduct.stockQuantity} </strong>
                </p>
                <p>
                  <small>Rating:  </small>
                  <strong>{fixedRating} </strong>
                </p>
              </div>

              <p>
                <small>Description:  </small>
                <strong>{currentProduct.description}</strong>
              </p>
            </div>
            <div className="media-right">
              <button className="delete" type="button" />
              <Link to={`/products/${productId}/edit`}>
                <a className="button is-primary">Edit Product</a>
              </Link>
            </div>
          </article>
          </div>
        </div>
        
        <div className='tile is-parent'>
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
