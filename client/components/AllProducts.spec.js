/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from './AllProducts'
import ProductCard from './ProductCard'
const adapter = new Adapter()
enzyme.configure({adapter})

describe.only('<AllProducts /> Component', () => {
  let allProducts;
  // let products = [{
  //   id: 10,
  //   title: 'Pikachu',
  //   price: 199.99,
  //   stockQuantity: 10,
  //   imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'
  // }, {
  //   id: 15,
  //   title: 'Bulasaur',
  //   price: 149.99,
  //   stockQuantity: 3,
  //   imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png'
  // }];
  it('renders "No Products" if passed an empty array of products', () => {
    // throw new Error('replace this error with your own test')
    const wrapper = shallow(
      <AllProducts products={[]} />
    );
    expect(wrapper.text()).to.include('No Products');
  });
});
