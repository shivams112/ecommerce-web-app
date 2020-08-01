import React, { useEffect, useState } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";
//import MyCarousel from "./MyCarousel";

const Cart = () => {
  const [products, setproducts] = useState([]);
  const [error, seterror] = useState("");
  const [reload, setreload] = useState(false);

  const loadMyCart = () => {
    setproducts(loadCart);
  };

  useEffect(() => {
    loadMyCart();
  }, [reload]);

  const loadProducts = () => (
    <div >
      {products.length ? ( products.map((item, index) =>
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
    return <StripeCheckout 
     products = {products}
     setreload = {setreload}
     reload = {reload}
    />
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
