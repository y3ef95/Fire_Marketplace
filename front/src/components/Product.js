import React from "react";
import { Avatar, Card, Col, Row, Comment, Tooltip } from "antd";
import { useAppContext } from "store";
import CommentList from "./CommentList";
import "scss/Product.scss";

export default function Product({ product, handleLike }) {
  const {
    writer,
    product_name,
    product_price,
    product_like,
    product_hits,
    product_condition,
    exchange_or_not,
    delivery_included,
    trading_location,
    product_desc,
    product_image,
    product_count,
    tag_set,
  } = product;
  const { username, avatar_url } = writer;

  return (
    <div>
      <Card
        style={{ width: "130px" }}
        className="product_card"
        hoverable
        cover={<img src={product_image} alt={product_name} />}
      ></Card>
    </div>
  );
}
