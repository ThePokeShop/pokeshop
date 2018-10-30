/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Category = db.model('category')

describe('Category model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  it('has a category type field', () => {
    const category = Category.build({
      categoryType: 'electric'
    });
    expect(category.categoryType).to.equal('electric');
  })
}) // end describe('Category model')
