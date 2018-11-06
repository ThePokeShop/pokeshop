import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {fetchSingleOrder, getCurrentOrder} from '../store'
import Checkout from './Checkout'
import history from '../history'

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleOrder: orderId => dispatch(fetchSingleOrder(orderId)),
    getCurrentOrder: () => dispatch(getCurrentOrder())
  }
}
const mapStateToProps = state => {
  return {
    currentOrderId: state.orders.currentOrderId, //state.order.id,
    currentOrder: state.orders[state.orders.currentOrderId]
  }
}
class Cart extends React.Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    this.setState({loading: true})
    await this.props.getCurrentOrder()
    if (this.props.currentOrderId) {
      await this.props.fetchSingleOrder(this.props.currentOrderId)
    }
    this.setState({loading: false})
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.currentOrderId !== this.props.currentOrderId) {
      this.setState({loading: true})
      await this.props.fetchSingleOrder(this.props.currentOrderId)
      this.setState({loading: false})
    }
  }
  render() {
    const {currentOrderId, currentOrder} = this.props
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
    let total = 0
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
                  total += Number(item.totalPrice)
                  let {product, quantity, totalPrice} = item
                  return (
                    <tr key={item.id}>
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
                        <input type="number" placeholder={quantity} />
                      </td>
                      <td>${totalPrice}</td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <td />
                <td />
                <td />
                <td>
                  <div>
                    <p className="is-size-4 has-text-weight-bold">${total}</p>
                    <Link to="/checkout">
                      {/* <button type="button">Checkout</button> */}
                    </Link>
                  </div>
                </td>
              </tfoot>
            </table>
          </div>
          <div className="column is-2 is-offset-1 panel">
            <div className="panel-block">
              <p>Total: ${total}</p>
            </div>
            <div className="panel-block">
              <button type="button" className="button is-warning is-fullwidth">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
