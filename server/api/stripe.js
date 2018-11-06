const router = require('express').Router()
const stripe = require("stripe")("sk_test_UyF9KXKXQufmVRQDCwU7Kewd");
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    console.log('my body???? ---->>>>', req.body.stripeToken);
    const token = req.body
    const charge = await stripe.charges.create({
      amount: 9999,
      currency: 'usd',
      description: 'Example',
      source: token.id
    })
    console.log('------>>>>', charge)
    if (charge.status === 'succeeded') {
      //update the inventory
      //create a new cart for user
      //change status of the order to paid
      console.log('THIS HAPPENED???')
    }
    res.json(charge)
  } catch (err) {
    next(err)
  }
})




