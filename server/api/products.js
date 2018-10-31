const router = require('express').Router()
const {Product, Category} = require('../db/models')


  /:bucket/:item
  /:bucket?page=1

// api/orders.js
router.post('/', loginRequired, (req, res, next) => {
  const newOrder = {}
  req.body.userId !== req.user.id
  newOrder.userId = req.user.id
  Order.create({
    id: req.params.orderId,
    userId: req.user.id,
  })
})

router.get('/:orderId', loginRequired, (req, res, next) => {
  Order.findOne({ where: {
    id: req.params.orderId,
    userId: req.user.id,
  }})
})

router.get('/', async (req, res, next) => {
  const page = req.params.page || 1
  const perPage = req.params.perPage || 10
  try {
    const products = await Product.findAll({
      limit: perPage,
      offset: perPage * page,
      orderBy: ['id ASC'],
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
    res.json({
      page: page,
      totalCount: await Product.count(),
      items: products,
    })
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

router.post('/', async (req, res, next) => {
  const {title, price, imageUrl, stockQuantity, categoryId} = req.body
  const newProduct = {title, price, categoryId, stockQuantity}
  if (imageUrl) newProduct.imageUrl = imageUrl
  try {
    const product = await Product.create(newProduct)
    if (categoryId.length > 0) product.setCategory(categoryId)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

// server/util.js
const { loginRequired, adminGateway } = require('../util')
function loginRequired (req, res, next) {
  if (req.user) {
    next()
  }
  else {
    res.send(401)
  }
}

function adminGateway (req, res, next) {
  if (req.user.isAdmin) {
    next()
  }
  else {
    res.send(403)
  }
}

router.put('/:productId', loginRequired, adminGateway, async (req, res, next) => {
  const productId = req.params.productId
  // ignores id in request body - not sure if RESTful
  const {title, price, imageUrl, stockQuantity, categoryId} = req.body
  const newData = {title, price, categoryId, stockQuantity}
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
