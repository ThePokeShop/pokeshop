import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createNewProduct} from '../store/index'
import {withRouter} from 'react-router-dom';

class AddProduct extends Component {
  constructor(props) {
    super(props)
    const categories = props.categories;
    const checkObj = {};
    categories.forEach(category => {
      checkObj[category.id] = false;
    })
    this.state = {
      title: '',
      price: 0,
      imageUrl: '',
      stockQuantity: 0,
      categoryId: [],
      checkObj
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault();
    const categoryId = Object.keys(this.state.checkObj).filter(key => this.state.checkObj[key]);
    const productData = {...this.state, categoryId};
    await this.props.createNewProduct(productData);
    // this.setState({
    //   title: '',
    //   price: 0,
    //   imageUrl: '',
    //   stockQuantity: 0,
    //   categoryId: [],
    //   checkObj:
    // })
    this.props.history.push('/products');
  }

  handleCheck = (event) => {
    // toggles state.checkObj[categoryid] boolean
    const categoryId = event.target.name;
    const previousCheckObj = {...this.state.checkObj}
    const prevCheckVal = previousCheckObj[categoryId];
    this.setState({
      checkObj: {
        ...previousCheckObj,
        [categoryId]: !prevCheckVal
      }
    })
  }

  render() {
    const {name, title, price, imageUrl, stockQuantity, displayName, checkObj} = this.state;
    const handleChange = this.handleChange;
    const handleSubmit = this.handleSubmit;
    const categories = this.props.categories;
    const handleCheck = this.handleCheck;
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
                <div className="field">
                  <p className="has-text-centered">Categories:</p>
                  {categories.map(category => {
                    return (
                      <label key = {category.id} className="checkbox">
                        <input type="checkbox" name={category.id} checked={checkObj[category.id]} onChange={handleCheck}/>
                        {category.categoryType}
                      </label>
                    );
                  })}
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
    categories: state.categories
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    createNewProduct: (productData) => {
      dispatch(createNewProduct(productData));
      ownProps.history.push('/products');
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(AddProduct));
