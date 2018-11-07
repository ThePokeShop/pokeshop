
import React from 'react'

import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchSingleOrder, getCurrentOrder, updateQuantity, removeItem} from '../store'
import Checkout from './Checkout'
import history from '../history'
import TakeMoney from './CheckoutStripe'

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleOrder: orderId => dispatch(fetchSingleOrder(orderId)),
    getCurrentOrder: () => dispatch(getCurrentOrder()),
    updateQuantity: (quantity, lineItemId) => dispatch(updateQuantity(quantity, lineItemId)),
    removeItem: (lineItemId, orderId) => dispatch(removeItem(lineItemId, orderId))
  }
}

const mapStateToProps = state => {
  return {
    currentOrderId: state.orders.currentOrderId,
    currentOrder: state.orders[state.orders.currentOrderId],
  }
}

class Cart extends React.Component {

    state = {
      loading: true
    }

  async componentDidMount() {
    this.setState({ loading: true })
    await this.props.getCurrentOrder()
    if (this.props.currentOrderId) {
      await this.props.fetchSingleOrder(this.props.currentOrderId)
    }
    this.setState({ loading: false })
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.currentOrderId !== this.props.currentOrderId) {
      this.setState({ loading: true })
      if (this.props.currentOrderId) {
        await this.props.fetchSingleOrder(this.props.currentOrderId)
        this.setState({ loading: false })
      }
    }
  }

  handleQuantityChange = async (event) => {
    event.preventDefault();
    await this.props.updateQuantity(Number(event.target.value), Number(event.target.name));
  }

  handleRemoveItemClick = async (event) => {
    event.preventDefault();
    await this.props.removeItem(Number(event.target.name), this.props.currentOrderId);
  }

  render() {
    const { currentOrderId, currentOrder } = this.props
    const loading = this.state.loading
    if (loading) {
      return (
        <div className="container box">
          <div className="container box">
            <p className="title">Loading</p>
          </div>
        </div>
      )
    }
    if (!currentOrderId) {
      return (
        <div className="container box">
          <div className="container box">
            <p className="title">Your cart is empty</p>
          </div>
        </div>
      )
    }

    return (
      <div className="section">
        <p className="title">My Cart</p>
        <div className="container columns">
          <div className="box column is-9">
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {currentOrder.lineItems.map(item => {
                  let {product, quantity, totalPrice, id} = item
                  return (
                    <tr key={id}>
                      <td>
                        <div className="media">
                          <img
                            src={product.imageUrl}
                            className="image is-96x96 media-left"
                          />
                          <div className="media-content">
                            <Link to={`/products/${product.id}`}>
                              <p className="is-size-4">{product.title}</p>
                            </Link>
                            <p className="is-size-6">
                              {product.stockQuantity} in stock
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>${product.price}</td>
                      <td>
                        <input type="number" onChange={this.handleQuantityChange} name={id} value={quantity}/>
                      </td>
                      <td>${totalPrice}</td>
                      <td>
                        <button className="delete" type="button"
                            onClick={this.handleRemoveItemClick} name={id}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td>
                    <div>
                      <p className="is-size-4 has-text-weight-bold">${currentOrder.total}</p>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="column is-2 is-offset-1">
            <div className="panel-block">
              <p>Total: ${currentOrder.total}</p>
            </div>
            <div className="panel-block">
              <TakeMoney price={currentOrder.total} currentOrderId={currentOrderId} lineItems={currentOrder.lineItems} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
