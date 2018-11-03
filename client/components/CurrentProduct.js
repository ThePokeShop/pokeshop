import React from 'react'

import ProductCard from './ProductCard'
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store';
import { Link } from 'react-router-dom'

//keep as class instead of function component, since we will be adding more function later
class CurrentProduct extends React.Component {
  componentDidMount() {
    const productId = this.props.match.params.productId;
    if (productId == Number(productId)) {
      this.props.fetchSingleProduct(productId);
    }
  }

  render() {
    const productId = this.props.match.params.productId;
    if (productId != Number(productId)) {
      return (
        <div>404</div>
      ) //<Notfound/>
    }
    const { currentProduct } = this.props;
    if (!currentProduct.title) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="section container">
          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png" />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>John Smith</strong> <small>@johnsmith</small>{' '}
                  <small>31m</small>
                  <br>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin ornare magna eros, eu pellentesque tortor vestibulum
                    ut. Maecenas non massa sem. Etiam finibus odio quis feugiat
                    facilisis.
                  </br>
                </p>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                  <a className="level-item">
                    <span className="icon is-small">
                      <i className="fas fa-reply" />
                    </span>
                  </a>
                  <a className="level-item">
                    <span className="icon is-small">
                      <i className="fas fa-retweet" />
                    </span>
                  </a>
                  <a className="level-item">
                    <span className="icon is-small">
                      <i className="fas fa-heart" />
                    </span>
                  </a>
                </div>
              </nav>
            </div>
            <div className="media-right">
              <button className="delete" />
              <Link to={`/products/${productId}/edit`}>Edit this Product</Link>
            </div>
          </article>
        </div>
      );
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

