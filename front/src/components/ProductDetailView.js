import React from "react";
import { HeartFilled, EyeFilled, ClockCircleFilled } from "@ant-design/icons";
import moment from "moment";
import "scss/ProductDetailView.scss";
import CommentList from "./CommentList";
import { useAppContext } from "store";
import { Axios } from "axios";
import { useParams } from "react-router-dom";
import { axiosInstance } from "api";
import { Button } from "antd";

export default function ProductDetailView({ product, handleLike }) {
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
    is_like,
    likes,
  } = product;
  const { username, avatar_url } = writer;
  console.log(product);
  return (
    <div className="product_detail_main">
      <hr style={{ width: "100%" }} size="1" color="#000000" />
      <div style={{ display: "flex" }}>
        <img src={product_image} style={{ width: 400, height: 400 }} />
        <div className="product_related">
          <div className="product_related_first">
            <div>{product_name}</div>
            <div>{product_price}&nbsp;원</div>
          </div>
          <hr style={{ width: "100%" }} size="1" color="#bbbbbb" />
          <div className="product_related_second" style={{ display: "flex" }}>
            <div style={{ marginRight: 15 }}>
              <HeartFilled />
              &nbsp;&nbsp;
              {likes}
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
          <div className="product_related_button">
            <div>
              {is_like ? (
                <Button
                  style={{
                    marginTop: 20,
                    marginRight: 20,
                    backgroundColor: "#fe4d4d",
                    width: 180,
                    height: 53,
                    fontSize: 20,
                    color: "white",
                  }}
                  onClick={() => handleLike({ product, like_unlike: false })}
                >
                  <HeartFilled />찜
                </Button>
              ) : (
                <Button
                  style={{
                    marginTop: 20,
                    marginRight: 20,
                    backgroundColor: "#dddddd",
                    width: 180,
                    height: 53,
                    fontSize: 20,
                    color: "white",
                  }}
                  onClick={() => handleLike({ product, like_unlike: true })}
                >
                  <HeartFilled />찜
                </Button>
              )}
              <Button
                style={{
                  marginTop: 20,
                  backgroundColor: "orange",
                  width: 180,
                  height: 53,
                  fontSize: 20,
                  color: "white",
                }}
              >
                연락하기
              </Button>
            </div>
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
          <CommentList product={product} />
        </div>
      </div>
    </div>
  );
}
