import axios from 'axios'

const initialState = {};
/* -----------------    ACTION TYPES    ------------------ */

const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT';

/* ------------     ACTION CREATORS      ------------------ */

export const setCurrentProduct = product => ({type: SET_CURRENT_PRODUCT, product})

/* ------------          REDUCER         ------------------ */

export default function currentProductReducer(state = initialState, action) {
  try {
    switch (action.type) {
      case SET_CURRENT_PRODUCT:
        return action.product
      default:
        return state
    }
  } catch (err) {
    console.error(err)
  }
}

/* ------------       THUNK CREATORS     ------------------ */
export const fetchSingleProduct = (productId) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${productId}`);
    const action = setCurrentProduct(data);
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}
