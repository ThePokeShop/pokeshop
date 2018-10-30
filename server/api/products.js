const router = require('express').Router()
const {Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId
    const currentProduct = await Product.findById(productId);
    if (currentProduct) {
      res.json(currentProduct);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router;
