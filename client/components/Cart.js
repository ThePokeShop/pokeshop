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
      return (
        <div>
          <ul>
            {currentOrder.lineItems.map(
              item => {
                return (

                <li key={item.id}>
                  <img src={item.product.imageUrl}/>
                  <strong>Pokemon: </strong> {item.product.title}
                  <strong>Quantity: </strong>{item.quantity}<strong>Total: </strong>{item.totalPrice}
                </li>

                )
              }
            )}
            <strong>SubTotal: {currentOrder.total}</strong>
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
