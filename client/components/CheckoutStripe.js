import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

class TakeMoney extends Component {
  onToken = async token => {
    const data = await axios.post('/api/save-stripe-token', { token });
    console.log('data ---->', data);
  }

  render() {
    return (
      <StripeCheckout
        name='Poke Shop'
        description='Pokémon'
        image='/img/poke-logo.jpg'
        amount={10000} //fixed amount for now, change that later!!
        currency='USD'
        token={this.onToken}
        stripeKey="pk_test_cxZnIOSOcldT8Iomlsx1h4bW"

      />
    )
  }
}

export default TakeMoney
