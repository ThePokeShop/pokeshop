const router = require('express').Router()
const {LineItem, Order} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const {quantity, totalPrice, productId, orderId} = req.body;
    const lineItem = await LineItem.findOne({where:{productId, orderId}});
    if (lineItem) {
      const qtyIncrement = quantity+lineItem.quantity;
      const newTotalPrice = qtyIncrement * (totalPrice/quantity)
      const updatedItem = await lineItem.update({quantity: qtyIncrement, totalPrice: newTotalPrice, productId, orderId});
      res.json(updatedItem);
    } else {
      const newItem = await LineItem.create({quantity, totalPrice, productId, orderId});
      res.json(newItem);
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:lineItemId', async (req, res, next) => {
  try {
    const lineItemId = req.params.lineItemId;
    // const {quantity, totalPrice, productId} = req.body;

    const lineItem = await LineItem.findOne({where: {id: lineItemId}}, {include: [{model: Order}, {where: {status: 'active'}}]});
    if (lineItem) {
      await lineItem.update(
        req.body,
        {where: {id: lineItemId}}
      )
      res.json(lineItem)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:lineItemId', async (req, res, next) => {
  try {
    const lineItemId = req.params.lineItemId
    await LineItem.destroy({where: {id: lineItemId}})
  } catch (err) {
    next(err)
  }
})
