import React from "react";
import { useParams } from "react-router-dom";
import { useAxios, axiosInstance } from "api";
import ProductDetailView from "components/ProductDetailView";

export default function ProductDetail() {
  const params = useParams();

  const [{ data, loading, error }, refetch] = useAxios({
    url: `/contents/products/${params.id}/`,
  });
  return <div>{data && <ProductDetailView data={data} />}</div>;
}
