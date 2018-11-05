import axios from 'axios'

/* -----------------    ACTION TYPES    ------------------ */
const SET_CATEGORIES = 'SET_CATEGORIES'
const TOGGLE_CATEGORY_SELECTED = 'TOGGLE_CATEGORY_SELECTED'
const SET_CATEGORIES_TRUE = 'SET_CATEGORIES_TRUE'
const SET_CATEGORIES_FALSE = 'SET_CATEGORIES_FALSE'
const SELECT_CATEGORIES_WITH_ARRAY = 'SELECT_CATEGORIES_WITH_ARRAY'

/* ------------     ACTION CREATORS      ------------------ */

export const toggleCategorySelected = id => ({
  type: TOGGLE_CATEGORY_SELECTED,
  id
})
export const setCategoriesTrue = () => ({type: SET_CATEGORIES_TRUE})
export const setCategoriesFalse = () => ({type: SET_CATEGORIES_FALSE})
export const selectCategoriesWithArray = (catIds) => ({type: SELECT_CATEGORIES_WITH_ARRAY, catIds })

/* ------------          REDUCER         ------------------ */

const initialState = {}
let allTrueObj = {}
let allFalseObj = {}

export default function categoriesAreSelectedReducer(
  state = initialState,
  action
) {
  try {
    let newState;
    switch (action.type) {
      case SET_CATEGORIES:
        action.categories.forEach(category => {
          allTrueObj[category.id] = true
        })
        action.categories.forEach(category => {
          allFalseObj[category.id] = false
        })
        return allTrueObj
      case TOGGLE_CATEGORY_SELECTED:
        return {...state, [action.id]: !state[action.id]}
      case SET_CATEGORIES_TRUE:
        return {...allTrueObj}
      case SET_CATEGORIES_FALSE:
        return {...allFalseObj}
      case SELECT_CATEGORIES_WITH_ARRAY:
        newState = {...allFalseObj};
        action.catIds.forEach(catId => {
          newState[catId] = true
        })
        return newState;
      default:
        return state
    }
  } catch (err) {
    console.error(err)
  }
}

/* ------------       THUNK CREATORS     ------------------ */
