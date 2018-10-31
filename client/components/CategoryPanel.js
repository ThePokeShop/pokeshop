
import React from 'react'
import { connect } from 'react-redux'
import { toggleCategorySelected } from '../store/index'

//this needs to be a func comp

const CategoryPanel = (props) => {

  const handleCheck = event => {
    const id = event.target.name
    props.toggleCategorySelected(id)
  }
  const { categoriesAreSelected, categories } = props
  return (
    <nav className='panel'>
      {categories.map(category => {
        return (<label key={category.id} className='panel-block'>
          <input type='checkbox' onChange={handleCheck} name={category.id} checked={categoriesAreSelected[category.id]} />{category.categoryType}
        </label>
        )
      })}
    </nav>
  )

}
const mapStateToProps = state => {
  return {
    categories: state.categories,
    categoriesAreSelected: state.categoriesAreSelected
  }
}
const mapDispatchToProps = (dispatch) => ({
  toggleCategorySelected: (id) => dispatch(toggleCategorySelected(id))
})



export default connect(mapStateToProps, mapDispatchToProps)(CategoryPanel)

