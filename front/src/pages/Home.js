import ProductList from "components/ProductList";
import React from "react";
import "scss/Home.scss";

export default function Home() {
  return (
    <div className="app">
      <div className="temp_contents"></div>
      <div className="main_contents">
        <ProductList />
      </div>

      <div className="footer"></div>
    </div>
  );
}
