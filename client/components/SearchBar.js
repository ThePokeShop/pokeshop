import React, { Component } from 'react'
import { searchedProduct } from '../store/searchProducts'
import { connect } from 'react-redux'
import history from '../history'
export class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }
  handleClick = () => {
    const destroy = this.props.destroy;
    this.setState({
      value: ''
    })
    if (!this.state.value) history.push(`/products`);
    else history.push(`/products?key=${this.state.value}`)
    destroy();
  }
  render() {
    return (
      <div className='container'>
        <div className='level'>
          <input
            className="input is-widescreen"
            type="text"
            placeholder="Search..."
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button type='button' className="button is-primary" onClick={() => this.handleClick()}>Search</button>
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  searchedProduct: (searchedItem) => dispatch(searchedProduct(searchedItem))
})

export default connect(null, mapDispatchToProps)(SearchBar)
