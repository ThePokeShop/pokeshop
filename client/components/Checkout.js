import React, { Component } from 'react'
import { updateOrder, calculateTotal } from '../store';
import { connect } from "react-redux";


const mapDispatchToProps = (dispatch) => {
  return {
    updateOrder: (orderId, newData) => dispatch(updateOrder(orderId, newData)),
    calculateTotal: (order) => dispatch(calculateTotal(order))
  }
}
const mapStateToProps = state =>({
  currentOrder: state.orders[state.orders.currentOrderId],
  orderId: state.orders.currentOrderId
})

class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      lastName: '',
      shippingAddress: '',
      billingAddress: '',
      email: '',
      total: 0
    }
  }

  // componentDidUpdate(prevProp) {
  //   if(prevProps)

  //   if(total !== 0){
  //   this.setState({total})
  //   }
  // }
  handleEventChange = (event) => {
    this.setState({
       [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.shippingAddress && !this.state.billingAddress) {
      alert('all fields are required');
    } else {
      const newData = this.state;
      newData.status = 'created';
      this.props.updateOrder(this.props.orderId, newData);
      this.setState({
          name: '',
          lastName: '',
          shippingAddress: '',
          billingAddress: '',
          email: '',
          total: 0
      })
    }
  }

  render() {
    let total = 0;

    const { currentOrder } = this.props;
    if(currentOrder){
     if (currentOrder.lineItems) {
    currentOrder.lineItems.map(
      item => {
       total += Number(item.totalPrice)
      })
    }}


    let n = this.state.name.length,
        l = this.state.lastName.length,
        b = this.state.billingAddress.length,
        e = this.state.email.length,
        s = this.state.shippingAddress.length;
    let dis = n && l && b && e && s

    return (
      <div>
        <form onChange={this.handleEventChange} onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input className="input" type="text" placeholder="Name" value={this.state.name}  name='name' required/>
          </div>

          <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input className="input" type="text" placeholder="Last Name" value={this.state.lastName} name='lastName' required/>
          </div>

          <div className="field">
          <label className="label">Shipping Address</label>
          <div className="control">
            <input className="input" type="text" placeholder="Shipping Address" value={this.state.shippingAddress} name='shippingAddress' required/>
          </div>

          <div className="field">
          <label className="label">Billing Address</label>
          <div className="control">
            <input className="input" type="text" placeholder="Billing Address" value={this.state.billingAddress} name='billingAddress' required/>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input is-danger" type="email" placeholder="Email input" value={this.state.email} name='email' required/>
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            </div>
            <p className="help is-danger">This email is invalid</p>
          </div>
            <strong>TOTAL AMOUNT: {total}</strong>
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
      </div>
      </form>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
