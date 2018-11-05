const router = require('express').Router()
const stripe = require("stripe")("sk_test_UyF9KXKXQufmVRQDCwU7Kewd");
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    console.log('my body???? ---->>>>', req.body);
    const token = req.body.token;
    const charge = await stripe.charges.create({
      amount: 9999,
      currency: 'usd',
      description: 'Example',
      source: token.id
    })

    res.json(charge)
  } catch (err) {
    next(err)
  }
})
