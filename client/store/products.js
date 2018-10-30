import axios from 'axios'

const initialState = []
/* -----------------    ACTION TYPES    ------------------ */

const SET_PRODUCTS = "SET_PRODUCTS";


/* ------------     ACTION CREATORS      ------------------ */

export const setProducts = products => ({ type: SET_PRODUCTS, products });

/* ------------          HANDLER         ------------------ */

const handler = {
    [SET_PRODUCTS]: (state, action) => {return action.products}}


/* ------------          REDUCER         ------------------ */

export default function productsReducer(state = initialState, action) {
  if (!handler.hasOwnProperty(action.type)) {
      return state
  }
  return handler[action.type](state, action)
}

/* ------------       THUNK CREATORS     ------------------ */
export const fetchProducts = () => async dispatch => {
    try{
        const response = await axios.get('/api/products');
        const action = setProducts(response.data)
        dispatch(action);
    }catch(err){
        console.error(err)
    }
}