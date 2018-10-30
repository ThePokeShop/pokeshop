/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  it('has fields title, price, imageUrl, stock quantity', () => {
    const product = Product.build({
      title: 'Squirtle',
      price: 99.87,
      stockQuantity: 12
    })
    expect(product.title).to.equal('Squirtle')
    expect(product.price).to.equal(99.87)
    expect(product.imageUrl).to.equal('https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG')
    expect(product.stockQuantity).to.equal(12);
  })

  it('requires title, price, stock quantity', async () => {
    const product = Product.build({
      title: '',
      price: null,
      stockQuantity: null
    })

    try {
      await product.validate({notNull: true})
      throw Error('validation should have failed with null title, price and stockQuantity');
    } catch (err) {
      expect(err.message).to.contain('notNull Violation: product.title cannot be null');
      expect(err.message).to.contain('notNull Violation: product.price cannot be null');
      expect(err.message).to.contain('notNull Violation: product.stockQuantity cannot be null');
    }
  })

  it('default imageUrl if left blank', async () => {
    const product = Product.build({
      title: 'Squirtle',
      price: 99.87,
      stockQuantity: 12
    })
    await product.validate()
    expect(product.imageUrl).to.be.a('string')
    expect(product.imageUrl.length).to.be.greaterThan(1)
  })
}) // end describe('Product model')
