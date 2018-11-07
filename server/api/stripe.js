const router = require('express').Router()
const Order = require('../db/models/order')
const stripe = require('stripe')('sk_test_UyF9KXKXQufmVRQDCwU7Kewd')
const Product = require('../db/models/product')
const nodemailer = require('nodemailer')

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const token = req.body.token
    const price = Math.floor(Number(req.body.price * 100))
    const orderId = req.body.currentOrderId

    const charge = await stripe.charges.create({
      amount: price,
      currency: 'usd',
      description: 'Example',
      source: token.id
    })


    if (charge.status === 'succeeded') {
      const {
        address_city,
        address_line1,
        address_state,
        address_zip
      } = charge.source
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

      let test = req.body.lineItems.map(async item => {
        let id = item.productId
        let quantity = item.quantity
        let product = await Product.findById(id)
        let prevQuantity = product.stockQuantity
        let updatedProduct = await product.update({
          stockQuantity: prevQuantity - quantity
        })
      })

      // email on checkout
      const email = token.email
      const name = token.card.name
      // WHAT IS USER EMAIL? GET FROM STRIPE
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD
        }
      })

      // PUT MORE USER/ORDER INFORMATION HERE
      const mailOptions = {
        from: 'no-reply@the-poke-shop.herokuapp.com',
        to: email, // PUT EMAIL HERE
        subject: `Thank you for your purchase! (Order #${orderId})`,
        // PUT NAME HERE?
        html: `<p>Hello, ${
          name
        }!</p><p>Thank you for purchasing some pokemon.</p>`
      }
      transporter.sendMail(mailOptions, err => {
        if (err) {
          res.status(500).send({msg: err.message})
        } else {
          console.log(`email was sent successfully to ${email}`)
        }
      })
    }
    res.json({message: 'success'})
  } catch (err) {
    next(err)
  }
})
