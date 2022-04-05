import React, { useEffect, useState } from "react";
import { Alert } from "antd";
import { useAxios, axiosInstance } from "api";
import ProductView from "./ProductView";
import { useAppContext } from "store";
import "scss/ProductList.scss";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [productList, setProductList] = useState([]);

  const [{ data: originProductList, loading, error }, refetch] = useAxios({
    url: "/contents/products/",
  });

  useEffect(() => {
    setProductList(originProductList);
  }, [originProductList]);

  return (
    <div className="product_list">
      {productList && productList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다. :-(" />
      )}
      {productList &&
        productList.map((product) => (
          <ProductView product={product} key={product.id} />
        ))}
    </div>
  );
}
