import axios from 'axios'

const initialState = {
  products: [],
}
/* -----------------    ACTION TYPES    ------------------ */

const SET_PAGINATED_PRODUCTS_STATE = 'SET_PAGINATED_PRODUCTS_STATE';


/* ------------     ACTION CREATORS      ------------------ */

export const setPaginatedProductsState = newState => ({type: SET_PAGINATED_PRODUCTS_STATE, newState})

/* ------------          REDUCER         ------------------ */

export default function paginatedProductsReducer(state = initialState, action) {
  try {
    switch (action.type) {
      case SET_PAGINATED_PRODUCTS_STATE:
        return {...action.newState}
      default:
        return state
    }
  } catch (err) {
    console.error(err)
  }
}

/* ------------       THUNK CREATORS     ------------------ */
export const fetchPaginatedProducts = (queryStr) => async dispatch => {
  try {
    const response = await axios.get(`/api/products?${queryStr}`)
    const action = setPaginatedProductsState(response.data)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

// export const createNewProduct = (productData) => async dispatch => {
//   try {
//     const response = await axios.post('/api/products', productData);
//     const action = addNewProduct(response.data)
//     dispatch(action)
//   } catch (err) {
//     console.error(err)
//   }
// }
