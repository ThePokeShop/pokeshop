import React from 'react'
import {connect} from 'react-redux'
import {
  toggleCategorySelected,
  setCategoriesTrue,
  setCategoriesFalse
} from '../store/index'
import {Link} from 'react-router-dom'

const CategoryPanel = props => {
  // util function to create a new query string

  const {categoriesAreSelected, categories, location, searchKey} = props
  const params = location.search.slice(1).split('&')

  // generate URLs
  const filteredCat = Object.keys(categoriesAreSelected).filter(
    id => categoriesAreSelected[id]
  )
  const linkBuilder = (currentParams, catIds) => {
    let returnParams = currentParams.filter(param => !param.startsWith('catIds='))
    if (catIds.length < categories.length) returnParams = returnParams.concat(`catIds=${JSON.stringify(catIds)}`)
    return `?${returnParams.join('&')}`
  }
  const submitUrl = linkBuilder(params, filteredCat)
  const keyRemover = currentParams => {
    const returnParams = currentParams.filter(
      param => !param.startsWith('key=')
    )
    return `?${returnParams.join('&')}`
  }
  const keyRemoveUrl = keyRemover(params)

  // disable apply filter btn if catIds empty
  const applyBtnDisabled = filteredCat.length === 0;
  // handle events
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
  const handleApply = () => {
    props.history.push(submitUrl)
  }

  return (
    <nav className="panel column is-2 is-fullheight is-narrow">
      <p className="panel-heading">Product Filter</p>
      {searchKey && (
        <p className="panel-block">
          <p className="control has-icons-right">
            Search Term: {searchKey}
            <Link to={keyRemoveUrl}>
              <span className="panel-icon is-right">
                <i className="delete" />
              </span>
            </Link>
          </p>
        </p>
      )}
      <p className="panel-tabs">
        <p className="is-active is-size-5">Categories</p>
      </p>
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
          className="button is-outlined is-fullwidth"
          type="button"
          onClick={handleClickFalse}
        >
          Uncheck All
        </button>
      </div>
      <div className="panel-block">
        <button
          className="button is-outlined is-fullwidth"
          type="button"
          onClick={handleClick}
        >
          Check All
        </button>
      </div>
      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          type="button"
          onClick={handleApply}
          disabled={applyBtnDisabled}
        >
          Apply Filter
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
