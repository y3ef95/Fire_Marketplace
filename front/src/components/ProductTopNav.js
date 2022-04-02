import React from "react";
import "scss/ProductTopNav.scss";

export default function ProductTopNav() {
  return (
    <div className="product_top_nav" style={{ cursor: "pointer" }}>
      <div>상품등록</div>
      <div>|</div>
      <div>상품관리</div>
      <div>|</div>
      <div>구매/판매 내역</div>
    </div>
  );
}
