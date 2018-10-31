import React from 'react'
import {connect} from 'react-redux'
import {toggleCategorySelected} from '../store/index'

//this needs to be a func comp

const CategoryPanel = props => {
  const handleCheck = event => {
    const id = event.target.name
    props.toggleCategorySelected(id)
  }
  const {categoriesAreSelected, categories} = props
  return (
    <aside className="menu column is-2 is-fullheight is-narrow">
      <p className="menu-label">Select Categories</p>
      <ul className="menu-list">
        {categories.map(category => {
          return (
            <li key={category.id}>
              <label>
                <input
                  type="checkbox"
                  onChange={handleCheck}
                  name={category.id}
                  checked={categoriesAreSelected[category.id]}
                />
                {category.categoryType}
              </label>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
const mapStateToProps = state => {
  return {
    categories: state.categories,
    categoriesAreSelected: state.categoriesAreSelected
  }
}
const mapDispatchToProps = dispatch => ({
  toggleCategorySelected: id => dispatch(toggleCategorySelected(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPanel)
