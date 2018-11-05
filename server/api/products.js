const router = require('express').Router()
const { Product, Category } = require('../db/models')
const { loginRequired, adminGateway } = require('../utils');
const Sequelize = require('sequelize')
const Op = Sequelize.Op

router.get('/', async (req, res, next) => {
  try {
    // which page # to return - default 1
    let page = parseInt(req.query.page, 20);
    if (isNaN(page) || page < 1) {
      page = 1;
    }
    // items per request - default 20, max 50
    let limit = parseInt(req.query.limit, 20);
    if (isNaN(limit)) {
      limit = 20;
    } else if (limit > 50) {
      limit = 50;
    } else if (limit < 1 ) {
      limit = 1;
    }
    let offset = (page - 1) * limit;
    const options = {
      offset,
      limit,
      include: [
        {
          model: Category,
          as: 'Category',
          attributes: ['id', 'categoryType'],
          through: {
            attributes: []
          }
        }
      ],
      order: [['id', 'ASC']] // might be configurable?
    }
    if (req.query.key) {
      let searchedItem = req.query.key
      searchedItem = searchedItem.slice(0, 1).toUpperCase() + searchedItem.slice(1).toLowerCase()
      options.where = {
        title: {
          [Op.like]: `%${searchedItem}%`
        }
      }
    }

    const products = await Product.findAndCountAll(options)
    const response = {
      count: products.count,
      pageCount: Math.ceil(products.count/limit),
      key: req.query.key,
      page,
      limit,
      products: products.rows
    };
    res.json(response);
  } catch (err) {
    next(err)
  }
})
router.get('/search', async (req, res, next) => {
  try {
    let searchedItem = req.query.key
    if (searchedItem) {
      searchedItem = searchedItem.slice(0, 1).toUpperCase() + searchedItem.slice(1).toLowerCase()
      const searchedProduct = await Product.findAll({
        where: {
          title: {
            [Op.like]: `%${searchedItem}%`
          }
        }, include: [
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
      res.json(searchedProduct)
    }
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

router.put('/:productId', loginRequired, adminGateway, async (req, res, next) => {
  const productId = req.params.productId
  // ignores id in request body - not sure if RESTful
  const { title, price, imageUrl, stockQuantity, categoryId } = req.body
  const newData = { title, price, categoryId, stockQuantity }

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
