import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
//import MyCarousel from "./MyCarousel";

const Home = () => {
  console.log("API IS", API);
  return (
    <Base>
      <h1>
        Heyy
      </h1>
    </Base>
  );
};

export default Home;
