import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Login, Signup, UserHome, ProductView, CurrentProduct, AddProduct, EditProduct, UnmatchedRoute, SearchProductView, SignupSuccess, SignupConfirm, Cart, Checkout } from './components'
import { me, fetchProducts, fetchCategories, getCurrentOrder} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.getCurrentOrder()
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props

    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/signup/success" component={SignupSuccess} />
        <Route path="/signup/confirm" component={SignupConfirm} />
        <Route path='/products/search' component={SearchProductView} />
        <Route exact path="/products" component={ProductView} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        {isAdmin &&
          <Route exact path="/products/add" component={AddProduct} />
        }
        <Route exact path="/products/:productId" component={CurrentProduct} />
        {isAdmin &&
          <Route exact path="/products/:productId/edit" component={EditProduct} />
        }
        {isLoggedIn &&
          <Route path="/home" component={UserHome} />
        }

        <Route component={UnmatchedRoute} />

      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchProducts())
      dispatch(fetchCategories())
    },
    getCurrentOrder: () => dispatch(getCurrentOrder())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
