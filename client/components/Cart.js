import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { fetchSingleOrder } from '../store';
import Checkout from './Checkout';
import history from '../history';

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleOrder: (orderId) => dispatch(fetchSingleOrder(orderId)),
  }
};

const mapStateToProps = state => {
  return {
    currentOrderId: state.orders.currentOrderId, //state.order.id,
    currentOrder: state.orders[state.orders.currentOrderId]
  }
};

class Cart extends React.Component {
  state = {};

  componentDidMount() {
    if (this.props.currentOrderId) {
      this.props.fetchSingleOrder(this.props.currentOrderId);
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.currentOrderId !== this.props.currentOrderId) {
      this.props.fetchSingleOrder(this.props.currentOrderId);
    }
  }

  render() {

    const { currentOrderId, currentOrder } = this.props;
    if(currentOrder){
     if (currentOrder.lineItems[0].product) {
      let total = 0
      return (
        <div>
          <ul>
            {currentOrder.lineItems.map(
              item => {
                total += Number(item.totalPrice)
                return (

                <li key={item.id}>
                  Title: {item.product.title}, Quantity:{item.quantity}, Total:{item.totalPrice}
                </li>

                )
              }
            )}
            <strong>SubTotal: {total}</strong>
          </ul>
          <Link to='/checkout'>
            <button type="button" >
              Checkout
            </button>
          </Link>

        </div>
      )
    }else {
      return <div> Loading ...</div>
    }
   }else {
      return (
        <div>Loading...</div>
      )
    }

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
