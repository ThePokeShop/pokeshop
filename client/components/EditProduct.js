import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateSingleProduct} from '../store/index'
import {withRouter} from 'react-router-dom';

class EditProduct extends Component {
  constructor(props) {
    super(props)
    const {id, title, price, imageUrl, stockQuantity, Category} = props.currentProduct;
    this.state = {
      id,
      title,
      price,
      imageUrl,
      stockQuantity,
      Category,
      categoryId: Object.values(Category).map(cat => cat.id)
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault();
    console.log('this.state: ', this.state)
    await this.props.updateSingleProduct(this.state);
    this.props.history.push(`/products/${this.state.id}`);
  }

  render() {
    const {name, title, price, imageUrl, stockQuantity, displayName, Category} = this.state;
    const handleChange = this.handleChange;
    const handleSubmit = this.handleSubmit;
    const categories = this.props.categories;

    return (
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="card column is-4">
              <form
                onSubmit={handleSubmit}
                className="card-content"
                name={name}
              >
                <h1 className="is-size-3 has-text-centered">{displayName}</h1>
                <div className="field">
                  <label htmlFor="title" className="label">
                    Title:
                  </label>
                  <div className="control">
                    <input
                      className="input is-fullwidth"
                      htmlFor="title"
                      name="title"
                      type="text"
                      value={title}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="price" className="label">
                    Price:
                  </label>
                  <div className="control">
                    <input
                      className="input is-fullwidth"
                      htmlFor="price"
                      name="price"
                      type="number"
                      value={price}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="stockQuantity" className="label">
                    Stock Quantity:
                  </label>
                  <div className="control">
                    <input
                      className="input is-fullwidth"
                      htmlFor="stockQuantity"
                      name="stockQuantity"
                      type="number"
                      value={stockQuantity}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="imageUrl" className="label">
                    Image URL:
                  </label>
                  <div className="control">
                    <input
                      className="input is-fullwidth"
                      htmlFor="imageUrl"
                      name="imageUrl"
                      type="url"
                      value={imageUrl}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <button className="button" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
const mapState = state => {
  return {
    categories: state.categories,
    currentProduct: state.currentProduct
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    updateSingleProduct: (productData) => {
      dispatch(updateSingleProduct(productData));
      // ownProps.history.push('/products');
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(EditProduct));
