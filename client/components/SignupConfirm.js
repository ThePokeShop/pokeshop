import React, {Component} from 'react'
import {verifyToken} from '../store'
import {connect} from 'react-redux'

class SignupConfirm extends Component {
  constructor(props) {
    super(props)
  }
  async componentDidMount() {
    console.log(this.props.location.search.slice(7));
    const token = this.props.location.search.slice(7)
    try {
      await this.props.verifyToken(token)
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    const {pending, errorMessage, successMessage} = this.props;
    if (pending) {
      return (
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">
                Verifying token...
              </h1>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">
                {errorMessage || successMessage }
              </h1>
            </div>
          </div>
        </div>
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
  }
}

const mapDispatch = dispatch => {
  return {
    verifyToken: token => dispatch(verifyToken(token))
  }
}

export default connect(mapState, mapDispatch)(SignupConfirm)
