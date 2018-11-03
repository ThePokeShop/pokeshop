import React, {Component} from 'react'
import {verifyToken, resendToken, setToken} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
class SignupConfirm extends Component {
  async componentDidMount() {
    const token = this.props.location.search.slice(7) || this.props.token
    try {
      await this.props.verifyToken(token)
    } catch (err) {
      console.error(err)
    }
  }

  handleResend = async event => {
    event.preventDefault()
    const token = this.props.location.search.slice(7) || this.props.token
    try {
      await this.props.resendToken(token)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const {pending, errorMessage, successMessage} = this.props
    const isEmailValid =
      errorMessage === 'Token already used.' || successMessage
    const isTokenExpired = errorMessage.includes('expire');
    if (pending) {
      return (
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">Verifying token...</h1>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">{errorMessage || successMessage}</h1>
              {isEmailValid && (
                <React.Fragment>
                  <br />
                  <Link to="/login">Click here to log in.</Link>
                </React.Fragment>
              )}
              {isTokenExpired && this.renderIfTokenExpired()}
            </div>
          </div>
        </div>
      )
    }
  }

  renderIfTokenExpired = () => {
    const {statusMessage} = this.props
    const handleResend = this.handleResend
    if (statusMessage === '') {
      return (
        <React.Fragment>
          <br />
          <a className="is-size-5" onClick={handleResend}>Click here to send new token.</a>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <br />
          <h1 className="subtitle">{statusMessage}</h1>
        </React.Fragment>
      )
    }
  }
}

const mapState = state => {
  return {
    token: state.signupToken.token,
    errorMessage: state.signupToken.errorMessage,
    successMessage: state.signupToken.successMessage,
    pending: state.signupToken.pending,
    statusMessage: state.signupToken.statusMessage
  }
}

const mapDispatch = dispatch => {
  return {
    verifyToken: token => dispatch(verifyToken(token)),
    resendToken: token => dispatch(resendToken(token)),
    setToken: token => dispatch(setToken(token))
  }
}

export default connect(mapState, mapDispatch)(SignupConfirm)
