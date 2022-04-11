import React from "react";
import { useParams } from "react-router-dom";
import { useAxios, axiosInstance } from "api";
import { useAppContext } from "store";
import ProductDetailView from "components/ProductDetailView";

export default function ProductDetail() {
  const params = useParams();
  const {
    store: { jwtToken },
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };
  const [{ data, loading, error }, refetch] = useAxios({
    url: `/contents/products/${params.id}/`,
    headers,
  });
  const handleLike = async ({ product, like_unlike }) => {
    const apiUrl = `/contents/products/${product.id}/like/`;
    const method = like_unlike ? "POST" : "DELETE";
    console.log(product);
    console.log(like_unlike);
    try {
      const response = await axiosInstance({
        url: apiUrl,
        method,
        headers,
      });
      refetch();
      console.log("response :", response);
    } catch (error) {
      console.log("error :", error.response);
    }
  };

  return (
    <div>
      {data && <ProductDetailView product={data} handleLike={handleLike} />}
    </div>
  );
}
