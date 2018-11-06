import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {addToCart} from '../store'

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (product, currentOrderId) =>
      dispatch(addToCart(product, currentOrderId))
  }
}

const mapStateToProps = state => {
  return {
    currentOrderId: state.orders.currentOrderId
  }
}

const ProductCard = props => {
  const handleAddProduct = event => {
    event.preventDefault()
    props.addToCart(props.product, props.currentOrderId)
  }

  return (
    <div className="tile">
      <div className="card">
        <div className="card-image">
          <figure className="image is-256x256">
            <img src={props.product.imageUrl} alt="Placeholder image" />
          </figure>
        </div>
        <div className="card-content">
          <NavLink to={`/products/${props.product.id}`}>
            <div className="media">
              <div className="media-content">
                <p className="title is-4 is-centered">{props.product.title}</p>
                <div className="content is-centered">
                  ID: {props.product.id}
                </div>
                <div className="content is-centered">
                  Price: <strong>{`$${props.product.price}`}</strong>
                </div>
                <div className="content is-centered">
                  Quantity: {props.product.stockQuantity}
                </div>
                <div className="content is-centered">
                  Category:{' '}
                  <strong>
                    {props.product.Category.map(
                      category => category.categoryType + ' '
                    )}
                  </strong>
                </div>
              </div>
            </div>
          </NavLink>
        </div>
        <a className="button is-primary" onClick={handleAddProduct}>
          Add to Cart
        </a>
      </div>

      <div className="media-right">
        <button className="delete" type="button" onClick={addToCart} />
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
// export default ProductCard;
