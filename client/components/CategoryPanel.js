

import React from 'react'


//this needs to be a func comp

const CategoryPanel = (props) => {
  const { handleCheck, checkObj, categories } = props
  return (
    <nav className='panel'>
      {categories.map(category => {
        return (<label key={category.id} className='panel-block'>
          <input type='checkbox' onChange={handleCheck} name={category.id} checked={checkObj[category.id]} />{category.categoryType}
        </label>
        )
      })}
    </nav>
  )

}
export default CategoryPanel
// const mapState = state => {
//   return {
//     categories: state.categories
//   }
// }

