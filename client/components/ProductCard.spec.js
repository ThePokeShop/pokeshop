/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProductCard from './ProductCard'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('ProductCard', () => {
  let productCard
  let pokemon = {
    id: 10,
    title: 'Pikachu',
    price: 199.99,
    stockQuantity: 10,
    imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'
  }
  beforeEach(() => {
    productCard = shallow(<ProductCard product={pokemon} />)
  })

  it('renders the title in an h1', () => {
    expect(productCard.find('h1').text()).to.be.equal('Pikachu')
  })
  it('renders the id in an h2', () => {
    expect(productCard.find('h2').text()).to.be.equal('Product ID: 10')
  })
  it('renders the price in an h3', () => {
    expect(productCard.find('h3').text()).to.be.equal('Price: $199.99')
  })
  it('renders the quantity in an h4', () => {
    expect(productCard.find('h4').text()).to.be.equal('Quantity: 10')
  })
})
