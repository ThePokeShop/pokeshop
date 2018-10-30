import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
<section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="card column is-4">
              <form onSubmit={handleSubmit} name={name} className="card-content">
                <h1 className="is-size-3 has-text-centered">{displayName}</h1>
                <div className="field">
                  <label htmlFor="email" className="label">
                    Email:
                  </label>
                  <div className="control">
                    <input
                      className="input is-fullwidth"
                      htmlFor="email"
                      name="email"
                      type="email"
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="password" className="label">
                    Password:
                  </label>
                  <div className="control">
                    <input
                      className="input is-fullwidth"
                      htmlFor="password"
                      name="password"
                      type="password"
                    />
                  </div>
                </div>
                <button className="button" type="submit">
                  {displayName}
                </button>
                {error && error.response && <div> {error.response.data} </div>}
              </form>
              <footer className="card-footer">
                <div className="card-footer-item">
                  <p className="is-size-4">
                    <a target="_self" href="/auth/google">
                      {displayName} with Google
                    </a>
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </section>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}



