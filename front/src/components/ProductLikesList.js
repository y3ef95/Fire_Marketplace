import React, { useEffect, useState } from "react";
import { Alert } from "antd";
import { useAxios, axiosInstance } from "api";
import { useAppContext } from "store";
import ProductView from "./ProductView";

function PostList() {
  const {
    store: { jwtToken },
  } = useAppContext();

  const [productList, setProductList] = useState([]);

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: originPostList, loading, error }, refetch] = useAxios({
    url: "/products/",
    headers,
  });

  useEffect(() => {
    setProductList(originPostList);
  }, [originPostList]);

  const handleLike = async ({ product, is_like }) => {
    const apiUrl = `/contents/products/${product.id}/like/`;
    const method = is_like ? "POST" : "DELETE";

    try {
      const response = await axiosInstance({
        url: apiUrl,
        method,
        headers,
      });
      console.log("response :", response);

      setProductList((prevList) => {
        return prevList.map((currentPost) =>
          currentPost === product
            ? { ...currentPost, is_like: is_like }
            : currentPost
        );
      });
    } catch (error) {
      console.log("error :", error);
    }
  };

  return (
    <div>
      {productList && productList.length === 0 && (
        <Alert type="warning" message="상품이 없습니다. :-(" />
      )}
      {productList &&
        productList.map((product) => (
          <ProductView
            product={product}
            key={product.id}
            handleLike={handleLike}
          />
        ))}
    </div>
  );
}

export default PostList;
