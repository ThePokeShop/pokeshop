import React, { Component } from 'react'
import { updateOrder } from '../store';
import { connect } from "react-redux";


const mapDispatchToProps = (dispatch) => {
  return {
    updateOrder: (orderId, newData) => dispatch(updateOrder(orderId, newData))
  }
}
const mapStateToProps = state => ({
  currentOrder: state.orders[state.orders.currentOrderId],
  orderId: state.orders.currentOrderId
})

class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      shippingAddress: '',
      billingAddress: '',
      email: ''
    }
  }

  handleEventChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newData = this.state;
    newData.status = 'created';
    this.props.updateOrder(this.props.orderId, newData);
    this.setState({
      name: '',
      shippingAddress: '',
      billingAddress: '',
      email: ''
    })
  }

  render() {
    const { currentOrder } = this.props;
    if (!currentOrder) {
      return '';
    }
    let n = this.state.name.length,
      b = this.state.billingAddress.length,
      e = this.state.email.length,
      s = this.state.shippingAddress.length;
    let dis = n && b && e && s

    return (
      <div>
        <form onChange={this.handleEventChange} onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input className="input" type="text" placeholder="Name" value={this.state.name} name='name' required />
            </div>

            <div className="field">
              <label className="label">Shipping Address</label>
              <div className="control">
                <input className="input" type="text" placeholder="Shipping Address" value={this.state.shippingAddress} name='shippingAddress' required />
              </div>

              <div className="field">
                <label className="label">Billing Address</label>
                <div className="control">
                  <input className="input" type="text" placeholder="Billing Address" value={this.state.billingAddress} name='billingAddress' required />
                </div>

                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-danger" type="email" placeholder="Email input" value={this.state.email} name='email' required />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"/>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-exclamation-triangle"/>
                    </span>
                  </div>
                  <p className="help is-danger">This email is invalid</p>
                </div>
                <strong>TOTAL AMOUNT: {currentOrder.total}</strong>
                <div className="field is-grouped">
                  <div className="control">
                    <button className="button is-link" disabled={!dis}>Submit</button>
                  </div>
                  <div className="control">
                    <button className="button is-text">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  };
}
  export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
