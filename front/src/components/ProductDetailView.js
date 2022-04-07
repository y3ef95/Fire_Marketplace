import React from "react";
import { HeartFilled, EyeFilled, ClockCircleFilled } from "@ant-design/icons";
import moment from "moment";
import "scss/ProductDetailView.scss";
import CommentList from "./CommentList";

export default function ProductDetailView({ data }) {
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
    created_at,
  } = data;
  const { username, avatar_url } = writer;

  return (
    <div className="product_detail_main">
      <hr style={{ width: "100%" }} size="1" color="#000000" />
      <div style={{ display: "flex" }}>
        <img src={product_image} style={{ width: 300, height: 300 }} />
        <div className="product_related">
          <div className="product_related_first">
            <div>{product_name}</div>
            <div>{product_price}&nbsp;원</div>
          </div>
          <hr style={{ width: 500 }} size="1" color="#bbbbbb" />
          <div className="product_related_second" style={{ display: "flex" }}>
            <div style={{ marginRight: 15 }}>
              <HeartFilled />
              {product_like}
              &nbsp;&nbsp; |&nbsp;&nbsp;
              <EyeFilled />
              &nbsp;&nbsp;
              {product_hits}
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <ClockCircleFilled />
              &nbsp;&nbsp;
              <span>{moment(created_at).fromNow()}</span>
            </div>
          </div>
          <div className="product_related_third" style={{ display: "flex" }}>
            <p style={{ width: 80 }}>&bull;상품상태&nbsp;&nbsp;</p>
            {product_condition}
          </div>
          <div style={{ display: "flex" }}>
            <p style={{ width: 80 }}>&bull;교환여부&nbsp;&nbsp;</p>
            {exchange_or_not}
          </div>
          <div style={{ display: "flex" }}>
            <p style={{ width: 80 }}>&bull;배송비&nbsp;&nbsp;</p>
            {delivery_included}
          </div>
          <div style={{ display: "flex" }}>
            <p style={{ width: 80 }}>&bull;거래지역&nbsp;&nbsp;</p>
            {trading_location}
          </div>
        </div>
      </div>
      <hr style={{ width: "100%" }} size="1" color="#000000" />
      <div className="product_detail_bottom">
        <p>상품정보</p>
        <hr style={{ width: "100%" }} size="1" color="#dddddd" />
        <div className="product_desc">{product_desc}</div>
        <div>{product_count}</div>
        <div>{tag_set}</div>
      </div>
      <hr style={{ width: "100%" }} size="1" color="#000000" />
      <div className="product_detail_bottom">
        <p>댓글</p>
        <hr style={{ width: "100%" }} size="1" color="#dddddd" />
        <div className="comment">
          <CommentList product={data} />
        </div>
      </div>
    </div>
  );
}
