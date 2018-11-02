import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink, Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav
    className="navbar is-dark is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="navbar-brand">
      <a className="navbar-item">
        <NavLink to="/home">
          <img
            src="https://fontmeme.com/permalink/181030/daad87fcebbaa61672816a5c6bb13e9c.png"
            width="112"
            height="28"
          />
        </NavLink>
        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </a>
    </div>
    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <a className="navbar-item">
          <NavLink to="/home">Home</NavLink>
        </a>

        <a className="navbar-item">
          <NavLink to="/products">Products</NavLink>
        </a>

        <a className="navbar-item">
          <NavLink to="/categories">Categories</NavLink>
        </a>

        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">More</a>

          <div className="navbar-dropdown">
            <a className="navbar-item">About</a>
            <a className="navbar-item">Jobs</a>
            <a className="navbar-item">Contact</a>
          </div>
        </div>
      </div>
      <div className="navbar-end">
        {isLoggedIn ? (
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary" onClick={handleClick}>
                <strong>
                  <Link to="/signup">Log out</Link>
                </strong>
              </a>
            </div>
          </div>
        ) : (
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>
                  <Link to="/signup">Sign Up</Link>
                </strong>
              </a>
              <a className="button is-light">
                <Link to="/login">Login</Link>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
