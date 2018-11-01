import React, { Component } from 'react'
import { searchedProduct } from '../store/searchProducts'
import { connect } from 'react-redux'
export class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value })
    console.log('this state value ====>>', this.state.value)
  }
  handleClick = () => {
    this.props.searchedProduct(this.state.value);
    this.setState({
      value: ''
    })
  }
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button type='button' onClick={() => this.handleClick()}>Search</button>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  searchedProduct: (searchedItem) => dispatch(searchedProduct(searchedItem))
})
export default connect(null, mapDispatchToProps)(SearchBar)
