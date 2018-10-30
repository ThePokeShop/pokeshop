import axios from 'axios'

const initialState = []
/* -----------------    ACTION TYPES    ------------------ */

const SET_PRODUCTS = 'SET_PRODUCTS';
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';

/* ------------     ACTION CREATORS      ------------------ */

export const setProducts = products => ({type: SET_PRODUCTS, products})
export const addNewProduct = product => ({ type: ADD_NEW_PRODUCT, product})

/* ------------          HANDLER         ------------------ */

const handler = {
  [SET_PRODUCTS]: (state, action) => {
    return action.products;
  },
  [ADD_NEW_PRODUCT]: (state, action) => {
    return [...state, action.product];
  }
}

/* ------------          REDUCER         ------------------ */

export default function productsReducer(state = initialState, action) {
  if (!handler.hasOwnProperty(action.type)) {
    return state
  }
  return handler[action.type](state, action)
}

/* ------------       THUNK CREATORS     ------------------ */
export const fetchProducts = () => async dispatch => {
  try {
    const response = await axios.get('/api/products')
    const action = setProducts(response.data)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const createNewProduct = (productData) => async dispatch => {
  try {
    const response = await axios.post('/api/products', productData);
    const action = addNewProduct(response.data)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}
