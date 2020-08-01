import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  reload = undefined,
  setreload = (f) => f,
}) => {
  const [redirect, setredirect] = useState(false);

  const [count, setcount] = useState(product.count);

  const addToCartBut = () => {
    addItemToCart(product,product._id, () => setredirect(true));
  };

  const removeFromCartBut = () => {
    removeItemFromCart(product._id, product, () => setreload(!reload));
  };
  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  return (
    <div className="card text-black bg-white ">
      <div className="card-header lead ">{product.name}</div>
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead font-weight-normal text-wrap">
          {product.description}
        </p>
        {getARedirect(redirect)}
        <p className="btn btn-success rounded  btn-sm px-4">
          ₹ {product.price}
        </p>
        <div className="row">
          <div className="col-12">
            {addToCart && (
              <button
                onClick={addToCartBut}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
            )}
          </div>
          <div className="col-12">
            {removeFromCart && (
              <button
                onClick={removeFromCartBut}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
