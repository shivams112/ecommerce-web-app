import React, { useEffect, useState } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";
//import MyCarousel from "./MyCarousel";

const Home = () => {
  const [products, setproducts] = useState([]);
  const [error, seterror] = useState(false);

  const loadProducts = () => {
    getAllProducts().then((products) => {
      if (!products) {
        return <h1>Server not found</h1>;
      }
      if (products.error) {
        seterror(products.error);
      } else {
        // let productss;
        // if (typeof window !== undefined) {
        //   if (localStorage.getItem("products")) {
        //     productss = JSON.parse(localStorage.getItem("products"));
        //   }
        //   // productss = products
        //   localStorage.setItem("products", JSON.stringify(productss));
        //   setproducts(productss);
        // }
        setproducts(products);
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);
  console.log("API IS", API);
  return (
    <Base
      title="Welcome to my Store"
      description="one spot for all your needs! "
    >
      <div className="row text-center">
        <div className="row">
          {products.map((product, index) => {
            if (!product.inCart) {
              return (
                <div key={index} className="col-4 mb-4">
                  <Card product={product} />
                </div>
              );
            }
          })}
        </div>
      </div>
    </Base>
  );
};

export default Home;
