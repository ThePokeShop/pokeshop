const router = require('express').Router()
const {Product, Category} = require('../db/models')
const {loginRequired, adminGateway} = require('../utils');

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'Category',
          attributes: ['id', 'categoryType'],
          through: {
            attributes: []
          }
        }
      ]
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId
    const currentProduct = await Product.findById(productId, {
      include: [
        {
          model: Category,
          as: 'Category',
          attributes: ['id', 'categoryType'],
          through: {
            attributes: []
          }
        }
      ]
    })
    if (currentProduct) {
      res.json(currentProduct)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', loginRequired, adminGateway, async (req, res, next) => {
  const { title, price, imageUrl, stockQuantity, categoryId } = req.body
  const newProduct = { title, price, stockQuantity }
  if (imageUrl) newProduct.imageUrl = imageUrl
  try {
    const product = await Product.create(newProduct)
    if (categoryId.length > 0) await product.setCategory(categoryId)
    const updatedProduct = await Product.findById(product.id, {
      include: [
        {
          model: Category,
          as: 'Category',
          attributes: ['id', 'categoryType'],
          through: {
            attributes: []
          }
        }
      ]
    })
    res.json(updatedProduct);
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  const productId = req.params.productId
  // ignores id in request body - not sure if RESTful
  const { title, price, imageUrl, stockQuantity, categoryId } = req.body
  const newData = { title, price, categoryId, stockQuantity }
  console.log('newData: ', newData);
  if (imageUrl) newData.imageUrl = imageUrl
  try {
    const product = await Product.findById(productId)
    if (product) {
      await product.update(newData)
      await product.setCategory(categoryId)
      const updatedProduct = await Product.findById(productId, {
        include: [
          {
            model: Category,
            as: 'Category',
            attributes: ['id', 'categoryType'],
            through: {
              attributes: []
            }
          }
        ]
      })
      res.json(updatedProduct); // matches get request to api/products/:productId
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})
module.exports = router
