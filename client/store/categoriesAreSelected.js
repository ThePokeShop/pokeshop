import axios from 'axios'



/* -----------------    ACTION TYPES    ------------------ */

const SET_CATEGORIES = 'SET_CATEGORIES'
const TOGGLE_CATEGORY_SELECTED = 'TOGGLE_CATEGORY_SELECTED'
const SET_CATEGORIES_TRUE = 'SET_CATEGORIES_TRUE'
const SET_CATEGORIES_FALSE = 'SET_CATEGORIES_FALSE'

/* ------------     ACTION CREATORS      ------------------ */

// const setCategories = categories => ({ type: SET_CATEGORIES, categories })
export const toggleCategorySelected = id => ({
  type: TOGGLE_CATEGORY_SELECTED,
  id
})
 export const setCategoriesTrue = ()=> ({ type: SET_CATEGORIES_TRUE })
 export const setCategoriesFalse = ()=> ({ type: SET_CATEGORIES_FALSE })

/* ------------          REDUCER         ------------------ */

const initialState = {}
const checkObj = {}

export default function categoriesAreSelectedReducer(state = initialState, action) {
  try {
    switch (action.type) {
      case SET_CATEGORIES:
        action.categories.forEach(category => {
          checkObj[category.id] = true
        })
        return checkObj
      case TOGGLE_CATEGORY_SELECTED:
        return { ...state, [action.id]: !state[action.id] }
      case SET_CATEGORIES_TRUE:
         checkObj.mapValues(checkObj, () => true)
      return checkObj

      case SET_CATEGORIES_FALSE:
      default:
        return state;
    }
  } catch (err) {
    console.error(err);
  }
}

/* ------------       THUNK CREATORS     ------------------ */

