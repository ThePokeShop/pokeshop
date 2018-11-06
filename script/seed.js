'use strict'

const db = require('../server/db')
const { User, Product, Category, Order, LineItem, Review } = require('../server/db/models');
const productSeed = require('./productSeed.json')
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123', isAdmin: true, isEmailVerified: true }),
    User.create({ email: 'murphy@email.com', password: '123', isEmailVerified: true })
  ])

  
  const catTypes = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground',
    'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon'];

  const categories = await Promise.all(catTypes.sort().map(categoryType => Category.create({ categoryType })));

  const orders = await Promise.all([
    Order.create({ status: 'active', userId: users[1].id }),
    Order.create({ status: 'active', userId: users[0].id }),
    Order.create({status: 'shipped', userId: users[1].id})
  ]);


  let products = await Promise.all(productSeed.map(product =>
    Product.create({ title: product.title, price: (Math.random() * 20).toFixed(2), stockQuantity: Math.floor(Math.random() * 100), description: product.description, imageUrl: product.imageUrl })
  )
  )
  const lineItems = await Promise.all([
    LineItem.create({
      quantity: 2,
      totalPrice: ((products[0].price) * 2),
      productId: products[0].id,
      orderId: orders[0].id
    }),
    LineItem.create({
      quantity: 10,
      totalPrice: ((products[0].price) * 10),
      productId: products[0].id,
      orderId: orders[1].id
    }),
    LineItem.create({
      quantity: 34,
      totalPrice: ((products[0].price)*34),
      productId: products[0].id,
      orderId: orders[2].id
    })
  ]);

  await Promise.all(products.map(product => {
    return product.addCategory(categories[Math.floor(Math.random() * catTypes.length)])
  }))

  const review = await Promise.all([
    Review.create({
      content: 'this pokemon is nice',
      rating: 5,
      productId: 1,
      userId: 1
    }),
    Review.create({
      content: 'this pokemon is so useless',
      rating: 1,
      productId: 2,
      userId: 2
    }),
    Review.create({
      content: 'this pokemon is big',
      rating: 3,
      productId: 1,
      userId: 2
    }),
    Review.create({
      content: 'this pokemon is small',
      rating: 4,
      productId: 2,
      userId: 1
    })
  ])
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
