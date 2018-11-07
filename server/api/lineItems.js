const router = require('express').Router()
const {LineItem, Order, Product} = require('../db/models');
const Sequelize = require('sequelize');
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
    const {quantity, productId} = req.body;

    const lineItem = await LineItem.findOne(
      {where: {id: lineItemId},
      include:
        [
          {model: Order, where: {status: 'active'}}, {model: Product, where: {stockQuantity: {[Sequelize.Op.gte]: quantity}}}
        ]
      }
    );
    if (lineItem) {
      await lineItem.update(
        {quantity, totalPrice: lineItem.product.price * quantity, productId},
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
