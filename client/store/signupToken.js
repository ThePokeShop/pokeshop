import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_TOKEN = 'SET_TOKEN'
const REMOVE_TOKEN = 'REMOVE_TOKEN'
const SET_TOKEN_ERROR_MESSAGE = 'SET_TOKEN_ERROR_MESSAGE'
const SET_TOKEN_SUCCESS_MESSAGE = 'SET_TOKEN_SUCCESS_MESSAGE'
/**
 * INITIAL STATE
 */
const defaultToken = {
  token: '',
  errorMessage: '',
  pending: true,
  successMessage: '',
};

/**
 * ACTION CREATORS
 */
export const setToken = token => ({type: SET_TOKEN, token})
export const removeToken = () => ({type: REMOVE_TOKEN})
const setTokenErrorMessage = (errorMessage) => {
  return {
    type: SET_TOKEN_ERROR_MESSAGE,
    errorMessage
  }
}
const setTokenSuccessMessage = (successMessage) => {
  return {
    type: SET_TOKEN_SUCCESS_MESSAGE,
    successMessage
  }
}

/**
 * THUNK CREATORS
 */
export const verifyToken = (token) => async dispatch => {
  try {
    dispatch(setToken(token))
    const {data} = await axios.get(`/auth/confirmation/${token}`)
    console.dir(data);
    dispatch(setTokenSuccessMessage(data.message));
  } catch (err) {
    console.error(err.response)
    dispatch(setTokenErrorMessage(err.response.data.message));
  }
}

/**
 * REDUCER
 */
export default function(state = defaultToken, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token
    }
    case REMOVE_TOKEN:
      return {...defaultToken}
    case SET_TOKEN_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.errorMessage,
        pending: false
      };
    case SET_TOKEN_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: action.successMessage,
        pending: false
      }
    default:
      return state
  }
}
