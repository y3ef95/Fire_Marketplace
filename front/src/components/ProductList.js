import React, { useEffect, useState } from "react";
import { Alert } from "antd";
import { useAxios, axiosInstance } from "api";
import Product from "./Product";
import { useAppContext } from "store";
import "scss/ProductList.scss";

export default function ProductList() {
  const {
    store: { jwtToken },
  } = useAppContext();

  const [productList, setProductList] = useState([]);

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: originProductList, loading, error }, refetch] = useAxios({
    url: "/contents/products/",
    headers,
  });

  useEffect(() => {
    setProductList(originProductList);
  }, [originProductList]);

  const handleLike = async ({ product, isLike }) => {
    const apiUrl = `/contents/products/${product.id}/like/`;
    const method = isLike ? "POST" : "DELETE";

    try {
      const response = await axiosInstance({
        url: apiUrl,
        method,
        headers,
      });
      console.log("response :", response);

      setProductList((prevList) => {
        return prevList.map((currentProdcut) =>
          currentProdcut === product
            ? { ...currentProdcut, is_like: isLike }
            : currentProdcut
        );
      });
    } catch (error) {
      console.log("error :", error);
    }
  };

  return (
    <div className="product_list">
      {productList && productList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다. :-(" />
      )}
      {productList &&
        productList.map((product) => (
          <Product product={product} key={product.id} handleLike={handleLike} />
        ))}
    </div>
  );
}
