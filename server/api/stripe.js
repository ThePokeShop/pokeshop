const router = require('express').Router()
const Order = require('../db/models/order')
const stripe = require("stripe")("sk_test_UyF9KXKXQufmVRQDCwU7Kewd");
const Product = require('../db/models/product')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    // console.log('my body???? ---->>>>', req.body);
    const token = req.body.token
    const price = Math.floor(Number((req.body.price) * 100))
    const orderId = req.body.currentOrderId


    const charge = await stripe.charges.create({
      amount: price,
      currency: 'usd',
      description: 'Example',
      source: token.id
    })
    if (charge.status === 'succeeded') {
      const { address_city, address_line1, address_state, address_zip } = charge.source
      const shippingAddress = {
        street: address_line1,
        city: address_city,
        state: address_state,
        zip: address_zip
      }
      const addres = JSON.stringify(shippingAddress)
      let order = await Order.findById(orderId)
      //change status from active to created
      let total = price / 100
      let updatedOrder = await order.update({
        total: total,
        status: 'created',
        shippingAddress: addres,
        billingAddress: addres
      })
      //update the quantity of the products purchased.
      //i have a line item array that's bunch of objects with product id and quantity.
      let id = req.body.lineItems[0].productId
      let quantity = req.body.lineItems[0].quantity
      // let prevQuantity =
      let product = await Product.findById(id);
      console.log('---->>>>>', product);


    }
    res.json({ message: 'successfully paid balance' })
  } catch (err) {
    next(err)
  }
})




