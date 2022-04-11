import React from "react";
import { Avatar, Card, Col, Row, Comment, Tooltip } from "antd";
import { useAppContext } from "store";
import CommentList from "./CommentList";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "scss/Product.scss";

export default function Product({ product }) {
  const navigate = useNavigate();
  const {
    id,
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
    created_at,
  } = product;
  const { username, avatar_url } = writer;
  const onClick = () => {
    navigate(`/contents/products/${id}`);
  };

  return (
    <div>
      <Card
        style={{ width: "155px", marginRight: 15, marginTop: 15 }}
        className="product_card"
        hoverable
        onClick={onClick}
        cover={<img src={product_image} alt={product_name} />}
      >
        <Card.Meta
          title={product_name}
          description={<span>{moment(created_at).fromNow()}</span>}
        />
      </Card>
    </div>
  );
}
