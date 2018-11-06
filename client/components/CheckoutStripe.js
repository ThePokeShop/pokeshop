import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import history from '../history'
import { getCurrentOrder, destroyOrder } from '../store/orders'
import { connect } from 'react-redux'


const mapDispatchToProps = dispatch => ({
  getCurrentOrder: () => dispatch(getCurrentOrder()),
})
class TakeMoney extends Component {


  //we need to change the action and transfer the thunk into redux
  //cart staying present even after the purchasem until refresh

  onToken = async (token) => {

    let info = { ...this.props, token }
    const { data } = await axios.post('/api/save-stripe-token', info);

    if (data.message === 'success') {
      await this.props.getCurrentOrder()
      history.push('/products')
    }

  }

  render() {

    let price = this.props.price * 100
    return (
      <StripeCheckout
        name='Poke Shop'
        description='Pokémon'
        image='/img/poke-logo.jpg'
        amount={price} //fixed amount for now, change that later!!
        currency='USD'
        token={this.onToken}
        stripeKey="pk_test_cxZnIOSOcldT8Iomlsx1h4bW"
        billingAddress={true}
        shippingAddress={true}
      />
    )
  }
}

export default connect(null, mapDispatchToProps)(TakeMoney)
