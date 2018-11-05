import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { fetchOrders } from '../store';

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: (active) => dispatch(fetchOrders(active))
  }
}

const componentDidMount = () => {
  this.props.fetchOrders();
}

const mapStateToProps = state => {
  return {
    cart: state.order,
    orders: state.orders
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
