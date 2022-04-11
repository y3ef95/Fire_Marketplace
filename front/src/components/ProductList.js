import React, { useEffect, useState } from "react";
import { Alert } from "antd";
import { useAxios, axiosInstance } from "api";
import { useAppContext } from "store";
import ProductView from "./ProductView";
import "scss/ProductList.scss";

export default function ProductList() {
  const {
    store: { jwtToken },
  } = useAppContext();

  const [productList, setProductList] = useState([]);

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: originProductList, loading, error }, refetch] = useAxios({
    url: "/contents/products/",
  });

  useEffect(() => {
    setProductList(originProductList);
  }, [originProductList]);

  return (
    <div className="product_list">
      {productList && productList.length === 0 && (
        <Alert type="warning" message="상품이 없습니다. :-(" />
      )}
      {productList &&
        productList.map((product) => (
          <ProductView product={product} key={product.id} />
        ))}
    </div>
  );
}
