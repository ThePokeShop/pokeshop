import React from 'react';

const ProductCard = props => {
  const {product} = props;
  const {title, imageUrl, id, stockQuantity, price} = product
  return (
    <div>
      <img src={imageUrl} />
      <h1>{title}</h1>
      <h2>Product ID: {id}</h2>
      <h3>Price: {`$${price}`}</h3>
      <h4>Quantity: {stockQuantity}</h4>
    </div>
  );
}

export default ProductCard;
