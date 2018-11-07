const router = require('express').Router()
const {Order, LineItem, Product} = require('../db/models')
const {loginRequired, adminGateway} = require('../utils')

router.get('/', async (req, res, next) => {
  try {
    if (!req.user) {
      let sid = req.session.id

      let guestOrder = await Order.findAll({
        where: {
          sid: sid,
          status: 'active'
        },
        include: [{model: LineItem}]
      })
      res.json(guestOrder)
      return
    }

    let where = {}
    const orderStatus = req.query.status
    const viewAsAdmin = req.query.viewAsAdmin === 'true'
    const statusVals = [
      'active',
      'created',
      'shipped',
      'cancelled',
      'delivered'
    ]
    if (orderStatus && !statusVals.includes(orderStatus)) {
      res.sendStatus(400)
      return
    }

    if (req.user) {
      const isAdmin = req.user.isAdmin
      const userId = req.user.id
      if (!viewAsAdmin || !isAdmin) {
        where.userId = userId
      }
    }
    if (orderStatus) {
      where.status = orderStatus
    }
    let options = {
      where,
      include: [{model: LineItem}]
    }

    const orders = await Order.findAll(options)
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId

    if (!req.user) {
      let sid = req.session.id

      let guestOrder = await Order.findOne({
        where: {
          sid: sid,
          id: orderId,
          status: 'active'
        },
        include: [
          {
            model: LineItem,
            include: [{model: Product}]
          }
        ]
      })
      res.json(guestOrder)
      return
    }

    const userId = req.user.id
    const isAdmin = req.user.isAdmin

    let options = {
      where: {id: orderId},
      include: [
        {
          model: LineItem,
          include: [{model: Product}]
        }
      ]
    }
    let {where} = options

    if (!isAdmin) {
      where.userId = userId
    }

    const order = await Order.findOne(options)
    if (order) {
      res.status(200)
      res.send(order)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
  const orderId = req.params.orderId
  let where = {id: orderId}
  let guestCart = req.query.guestCart
  let sid = req.session.id
  const viewAsAdmin = req.query.viewAsAdmin === 'true'

  if (req.user) {
    // if user is logged in & guestCart is a query
    if (guestCart) {
      try {
        // look for order by id and where sid matches
        const [guestOrder, userOrder] = await Promise.all([
          Order.findOne({
            where: {
              status: 'active',
              id: orderId,
              sid: sid,
              userId: null
            }
          }),
          Order.findOne({
            where: {
              status: 'active',
              userId: req.user.id
            }
          })
        ])
        if (!userOrder) {
          // if no existing cart then change the foreign key on order
          await guestOrder.update({userId: req.user.id})
          res.sendStatus(200)
          return
        } else {
          // get guest order line items
          let userOrderId = userOrder.id
          // get line items
          let [userLineItems, guestLineItems] = await Promise.all([
            LineItem.findAll({
              where: {
                orderId: userOrderId
              }
            }),
            LineItem.findAll({
              where: {
                orderId: orderId
              }
            })
          ])
          // build a map of line item Ids -> line item instance
          let userLineItemIds = {}
          userLineItems.forEach(async userLineItem => {
            userLineItemIds[userLineItem.productId] = userLineItem
          })
          // check if guest line item has corresponding entry in map
          // if it does, update the existing line item & delete guest line item
          // if it doesn't, reassign the line item order key
          guestLineItems.forEach(async guestLineItem => {
            let map = userLineItemIds
            let currProdId = guestLineItem.productId
            let guestQty = guestLineItem.quantity
            if (map[currProdId]) {
              let userQty = map[currProdId].quantity
              console.log(
                `lineItem #${
                  map[currProdId].id
                }user ${userQty} + guest ${guestQty}`
              )
              await map[currProdId].update({quantity: guestQty + userQty})
              guestLineItem.destroy()
            } else {
              await guestLineItem.update({orderId: userOrderId})
            }
          })
          // destroy the guest order and send response
          await guestOrder.destroy()
          res.sendStatus(200)
          return
        }
      } catch (err) {
        next(err)
      }
    }
    const isAdmin = req.user.isAdmin
    const userId = req.user.id
    if (!viewAsAdmin || !isAdmin) {
      where.userId = userId
    }
  } else {
    where.userId = null
    // where.sessionId =
  }

  try {
    const order = await Order.findOne({where})
    if (order) {
      await order.update(req.body)
      res.json(order)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const sid = req.session.id
    console.log('POST orders/ sid = ', sid)
    const userId = req.user ? req.user.id : null
    let data = {
      userId,
      sid
    }
    const newOrder = await Order.create(data)
    res.status(200).send(newOrder)
  } catch (err) {
    next(err)
  }
})

module.exports = router
