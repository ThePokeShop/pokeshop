const router = require('express').Router()
const {Product, Category} = require('../db/models')

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
    const currentProduct = await Product.findById(productId, {
      include: [{
        model: Category,
        as: 'Category'
      }]
    });
    if (currentProduct) {
      res.json(currentProduct);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const {title, price, imageUrl, stockQuantity, categoryId} = req.body;
  const newProduct = { title, price, categoryId, stockQuantity};
  if (imageUrl) newProduct.imageUrl = imageUrl;
  try {
    const product = await Product.create(newProduct);
    if (categoryId.length > 0) product.setCategory(categoryId);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// router.put('/:productId', async (req, res, next) => {
//   const newProduct = {
//     title: req.body.title,
//     price: req.body.price,
//     imageUrl: req.body.imageUrl,
//     stockQuantity: req.body.stockQuantity
//   };


// })
module.exports = router;
