import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToCart} from '../store'
class ProductCard extends React.Component {
  render() {
    const {product} = this.props
    return (
      <div className="tile">
        <div className="card">
          <div className="card-image">
            <figure className="image is-96x96">
              <img src={product.imageUrl} alt="Placeholder image" />
            </figure>
          </div>
          <div className="card-content">
            <NavLink to={`/products/${product.id}`}>
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
                </div>
              </div>
            </NavLink>
          </div>
          <button
            type="button"
            className="button is-primary"
            onClick={this.addProductOnClick}
          >
            Add to Cart
          </button>
        </div>

        <div className="media-right">
          <button
            className="delete"
            type="button"
            onClick={this.removeProductOnClick}
          />
        </div>
      </div>
    )
  }

  removeProductOnClick() {
    alert(`Selected product is now deleted`)
    // this.props.removeStudent(this.props.product.id);
  }
  addProductOnClick = async () => {
    const product = this.props.product
    const orders = this.props.orders
    const orderId = orders.currentOrderId
    console.log('orderId: ', orderId)
    await this.props.addToCart(product, orderId)
  }
}

/* -----------------    CONTAINER     ------------------ */

//set null since pass from allstudent
const mapState = state => ({
  orders: state.orders
})

const mapDispatch = dispatch => ({
  addToCart: (product, orderId) => dispatch(addToCart(product, orderId))
})

export default connect(mapState, mapDispatch)(ProductCard)
// export default ProductCard;
