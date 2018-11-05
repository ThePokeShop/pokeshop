import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { fetchSingleOrder } from '../store';

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleOrder: (orderId) => dispatch(fetchSingleOrder(orderId))
  }
}

const componentDidMount = () => {
  this.props.fetchSingleOrder(this.props.currentOrderId);
}

const mapStateToProps = state => {
  return {
    currentOrderId: state.order.id
  }
}

const Cart = (props) => {
  componentDidMount();
  const { orders, cart } = props;
  let x;

  if (!orders.length) {
    x = <div>Your cart is empty.</div>
  } else {
    x = (
      orders.map(order => {
        <ul>
          <li key={order.id}>{order.total}</li>
        </ul>
      })
    )

    return (
      <div>
        <h1>Your Cart</h1>
        {x}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
