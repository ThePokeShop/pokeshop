const router = require('express').Router();
const {Order, LineItem} = require('../db/models');
const {loginRequired, adminGateway} = require('../utils');

router.get('/', async (req, res, next) => {
  try {
    let options = {};
    let {where, include} = options;
    include = [{model: LineItem}];
    where = {};

    let isAdmin = req.user.isAdmin;
    let userId = req.user.id;
    const status = req.query.status;
    const statusVals = ['created', 'active', 'shipped', 'cancelled', 'delivered'];

    if (!isAdmin) {
      where.userId = userId;
      options.include = include;
    };
    if (statusVals.includes(status)) {
      where.status = status;
    } else {
      res.sendStatus(400);
    }

    const orders = await Order.findAll(options);
    if (orders) {
      res.status(200);
      res.send(orders)
    } else {
      res.sendStatus(404);
    }
  } catch(err) {
    next(err);
  }
});

router.get('/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin;
    let where = {orderId};
    const include = [{model: LineItem}];
    let options = {where, include};

    if (!isAdmin) {
      where.userId = userId;
    }

    const order = await Order.findOne(options);

    if (order) {
      res.status(200);
      res.send(order);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', loginRequired, adminGateway, async (req, res, next) => {
  const orderId = req.params.orderId;
  const {status} = req.body;
  try{
    const order = await Order.findOne({where: {id: orderId}});
    if (order) {
      await order.update(status);
      res.json(order);
    }
  } catch(err) {
    next(err)
  }
});

module.exports = router
