'use strict'

const db = require('../server/db')
const { User, Product, Category, Order, LineItem } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123', isAdmin: true, isEmailVerified: true, name: 'Cody' }),
    User.create({ email: 'murphy@email.com', password: '123', isEmailVerified: true, name: 'Murphy' })
  ])
  const catTypes = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground',
    'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon'];

  const categories = await Promise.all(catTypes.map(categoryType => Category.create({ categoryType })));

  const orders = await Promise.all([
    Order.create({status: 'active', userId: users[1].id}),
    Order.create({status: 'active', userId: users[0].id})
  ]);

  const products = await Promise.all([
    Product.create({ title: 'Pikachu', price: 10.44, stockQuantity: 3 }),
    Product.create({ title: 'Raichu', price: 3.44, stockQuantity: 31 })
  ]);

  const lineItems = await Promise.all([
    LineItem.create({
      quantity: 2,
      totalPrice: ((products[0].price)*2),
      productId: products[0].id,
      orderId: orders[0].id
    }),
    LineItem.create({
      quantity: 10,
      totalPrice: ((products[0].price)*10),
      productId: products[0].id,
      orderId: orders[1].id
    }),
  ]);

  await Promise.all([
    products[0].setCategory([categories[0]]),
    products[1].setCategory([categories[0]])
  ]);

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
