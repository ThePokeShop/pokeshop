const router = require('express').Router()
const {LineItem} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const {quantity, totalPrice, productId} = req.body;
    const newItem = await LineItem.create({quantity, totalPrice, productId});
    res.json(newItem)
  } catch (err) {
    next(err)
  }
});

router.put('/:lineItemId', async (req, res, next) => {
  try {
    const lineItemId = req.params.lineItemId;
    const {quantity, totalPrice, productId} = req.body;
    const lineItem = LineItem.findById(lineItemId);
    if (lineItem) {
      await lineItem.update({quantity, totalPrice, productId}, {where:{id: lineItemId}});
      res.json(lineItem)
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err)
  }
});

router.delete('/:lineItemId', async(req, res, next) => {
  try {
    const lineItemId = req.params.lineItemId;
    await LineItem.destroy({where:{id: lineItemId}});
  } catch (err) {
    next(err)
  }
})
