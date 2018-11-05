import React from 'react'
import {connect} from 'react-redux'
import {
  toggleCategorySelected,
  setCategoriesTrue,
  setCategoriesFalse
} from '../store/index'

//this needs to be a func comp

const CategoryPanel = props => {
  const {categoriesAreSelected, categories} = props
  const handleCheck = event => {
    const id = event.target.name
    props.toggleCategorySelected(id)
  }
  const handleClick = () => {
    props.setCategoriesTrue()
  }
  const handleClickFalse = () => {
    props.setCategoriesFalse()
  }
  const handleSubmit = event => {
    event.preventDefault()
    let filteredCat = categoriesAreSelected.keys.filter(id => categoriesAreSelected[id])
    console.log(`catId=${filteredCat}`)
  }
  return (
    <nav className="panel column is-2 is-fullheight is-narrow">
      <p className="panel-heading">Product Filter</p>
      <p className="panel-tabs">
        <a className="is-active">Categories</a>
      </p>
      <div className="panel-block">
        {/* <p className="control has-icons-left">
          <input className="input is-small" type="text" placeholder="search" />
          <span className="icon is-small is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p> */}
      </div>
      {categories.map(category => {
        return (
          <label className="panel-block" key={category.id}>
            <input
              type="checkbox"
              onChange={handleCheck}
              name={category.id}
              checked={categoriesAreSelected[category.id]}
            />
            {category.categoryType}
          </label>
        )
      })}
      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          type="button"
          onClick={handleClickFalse}
        >
          Uncheck All
        </button>
      </div>
      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          type="button"
          onClick={handleClick}
        >
          Reset Filter
        </button>
      </div>
      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          type="button"
          onClick={handleSubmit}
        >
          Filter Results
        </button>
      </div>
    </nav>
  )
}
const mapStateToProps = state => {
  return {
    categories: state.categories,
    categoriesAreSelected: state.categoriesAreSelected
  }
}
const mapDispatchToProps = dispatch => ({
  toggleCategorySelected: id => dispatch(toggleCategorySelected(id)),
  setCategoriesTrue: () => dispatch(setCategoriesTrue()),
  setCategoriesFalse: () => dispatch(setCategoriesFalse())
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPanel)
