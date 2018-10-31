import axios from 'axios'



/* -----------------    ACTION TYPES    ------------------ */

const SET_CATEGORIES = 'SET_CATEGORIES'
const TOGGLE_CATEGORY_SELECTED = 'TOGGLE_CATEGORY_SELECTED'

/* ------------     ACTION CREATORS      ------------------ */

const setCategories = categories => ({ type: SET_CATEGORIES, categories })
export const toggleCategorySelected = id => ({
  type: TOGGLE_CATEGORY_SELECTED,
  id
})

/* ------------          REDUCER         ------------------ */

const initialState = {}

export default function categoriesAreSelectedReducer(state = initialState, action) {
  try {
    switch (action.type) {
      case SET_CATEGORIES:
        let checkObj = {}
        action.categories.forEach(category => {
          checkObj[category.id] = true
        })
        return checkObj
      case TOGGLE_CATEGORY_SELECTED:
        return { ...state, [action.id]: !state[action.id] }
      default:
        return state;
    }
  } catch (err) {
    console.error(err);
  }
}

/* ------------       THUNK CREATORS     ------------------ */

