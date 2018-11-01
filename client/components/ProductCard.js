import React from "react";
import { NavLink } from "react-router-dom";
// import { connect } from "react-redux";

class ProductCard extends React.Component {

  render() {
    const { product } = this.props;
    console.log(product.Category.categoryType)
    return (
      <div className="tile">
        <NavLink to={`/products/${product.id}`}>
          <div className="card">
            <div className="card-image">
              <figure className="image is-256x256">
                <img src={product.imageUrl} alt="Placeholder image" />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4 is-centered">
                    {product.title}
                  </p>
                  <div className="content is-centered">ID: {product.id}</div>
                  <div className="content is-centered">
                    Price: <strong>{`$${product.price}`}</strong>
                  </div>
                  <div className="content is-centered">Quantity: {product.stockQuantity}</div>
                  <div className="content is-centered">Category: <strong>{product.Category.map(category => category.categoryType + " ")}</strong></div>
                </div>
              </div>
            </div>
            <a className="button is-primary" onClick={this.addProductOnClick}>Add to Cart</a>
          </div>
        </NavLink>

        <div className="media-right">
          <button
            className="delete"
            type="button"
            onClick={this.removeProductOnClick}
          />
        </div>

      </div>
    );
  }

  removeProductOnClick() {
    alert(`Selected product is now deleted`);
    // this.props.removeStudent(this.props.product.id);
  }
  addProductOnClick() {
    alert(`Selected product is now add to cart`);
    // this.props.removeStudent(this.props.product.id);
  }
}

/* -----------------    CONTAINER     ------------------ */

//set null since pass from allstudent
// const mapState = null;

// const mapDispatch = { removeStudent };

// export default connect(
//   mapState,
//   mapDispatch
// )(ProdcutCard);
export default ProductCard;
