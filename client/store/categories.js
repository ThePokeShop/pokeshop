import axios from 'axios'

const initialState = []
/* -----------------    ACTION TYPES    ------------------ */

const SET_CATEGORIES = 'SET_CATEGORIES'

/* ------------     ACTION CREATORS      ------------------ */

export const setCategories = categories => ({ type: SET_CATEGORIES, categories})


/* ------------          REDUCER         ------------------ */

export default function categoriesReducer(state = initialState, action) {
  try {
    switch (action.type) {
      case SET_CATEGORIES:
        return action.categories;
      default:
        return state;
    }
  } catch (err) {
    console.error(err);
  }
}

/* ------------       THUNK CREATORS     ------------------ */
export const fetchCategories = () => async dispatch => {
  try {
    const response = await axios.get('/api/categories')
    const action = setCategories(response.data)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}
