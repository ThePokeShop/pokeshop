import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import products from './products'
import currentProduct from './currentProduct'
import categories from './categories'
import categoriesAreSelected from './categoriesAreSelected'
import review from './review'
import signupToken from './signupToken'
import searchProduct from './searchProducts'
import orders from './orders'
import paginatedProducts from './paginatedProducts'

const reducer = combineReducers({ user, products, currentProduct, categories, categoriesAreSelected, signupToken, searchProduct, orders, paginatedProducts, review })


const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
//Keep these in alphabetical order to avoid duplicating
export * from './categories'
export * from './categoriesAreSelected'
export * from './currentProduct'
export * from './review'
export * from './searchProducts'
export * from './signupToken'
export * from './orders'
export * from './paginatedProducts'
export * from './products'
export * from './user'
