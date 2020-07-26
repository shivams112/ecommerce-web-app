import React, { useEffect, useState } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";
import { loadCart } from "./helper/cartHelper";
//import MyCarousel from "./MyCarousel";

const Cart = () => {
  const [items, setitems] = useState([]);
  const [error, seterror] = useState("");
  const [reload, setreload] = useState(false);

  const loadMyCart = () => {
    setitems(loadCart);
  };

  useEffect(() => {
    loadMyCart();
  }, [reload]);

  const loadProducts = () => (
    <div >
      {items.length ? ( items.map((item, index) =>
      (
        <Card
          key={index}
          addToCart={false}
          removeFromCart={true}
          product={item}
          reload = {reload}
          setreload = {setreload}
        />
      )
      ) ) : (<h2> Cart is empty</h2>)}
    </div>
  );

  const loadCheckout = () => {
    return <h1>Checkout</h1>;
  };
  return (
    <Base title="Your Cart" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">{loadProducts()}</div>
        <div className="col-6">{loadCheckout()}</div>
      </div>
    </Base>
  );
};

export default Cart;
