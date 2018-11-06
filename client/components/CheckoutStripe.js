import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import history from '../history'
class TakeMoney extends Component {


  onToken = async (token) => {

    let info = { ...this.props, token }
    const data = await axios.post('/api/save-stripe-token', info);
    if (data.status === 200) {
      history.push('/products')
    }
    console.log('my data comming back', data);
  }

  render() {
    console.log('my props', this.props);
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

export default TakeMoney
