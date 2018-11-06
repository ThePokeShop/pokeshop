const router = require('express').Router()
const {Order, LineItem, Product} = require('../db/models')
const {loginRequired, adminGateway} = require('../utils')

router.get('/', async (req, res, next) => {
  try {
    if (!req.user) {
      let sid = req.session.id;
      console.log('sid...', sid)
      let guestOrder = await Order.findAll({
        where: {
          sid: sid,
          status: 'active'
        },
        include: [{model: LineItem}]
      })
      res.json(guestOrder);
      return
    }
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

    let where = {}
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
      let sid = req.session.id;
      console.log('sid...', sid)
      let guestOrder = await Order.findOne({
        where: {
          sid: sid,
          id: orderId,
          status: 'active'
        },
        include: [{model: LineItem,
        include: [{model: Product}]}]
      })
      res.json(guestOrder);
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

router.put('/:orderId', loginRequired, adminGateway, async (req, res, next) => {
  const orderId = req.params.orderId
  const {status} = req.body
  try {
    const order = await Order.findOne({where: {id: orderId}})
    if (order) {
      await order.update(status)
      res.json(order)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const userId = req.user.id || null;
    const sid = req.session.sid;
    let data = {
      userId,
      sid
    };
    const newOrder = await Order.create(data);
    res.status(200).send(newOrder);
  } catch(err) {
    next(err);
  }
});

module.exports = router
