import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Input, Space } from "antd";
import {
  DollarCircleOutlined,
  UserOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import "scss/Header.scss";
import Nav from "./Nav";

export default function Header() {
  const navigate = useNavigate();
  const onSearch = (value) => console.log(value);
  return (
    <>
      <div className="top_bar">
        <div></div>
        <div className="top_bar_right">
          <Space>
            <div onClick={() => navigate("/login")}>
              <p>로그인/회원가입</p>
            </div>
            <div onClick={() => navigate("/profile")}>
              <p>내상점</p>
            </div>
          </Space>
        </div>
      </div>
      <hr size="1" color="#e8e8e8" />

      <div className="header">
        <div className="logo">
          <p onClick={() => navigate("/")}>불꽃장터</p>
          <div className="nav">
            <Nav />
          </div>
        </div>
        <div className="search">
          <Input.Search
            placeholder="상품명,지역명,@상점명 입력"
            size="large"
            onSearch={onSearch}
            style={{ width: 400 }}
          />
        </div>
        <div className="top_nav">
          <Space>
            <div>
              <DollarCircleOutlined />
              판매하기
            </div>
            <div onClick={() => navigate("/profile")}>
              <UserOutlined />
              내상점
            </div>
            <div>
              <MessageOutlined />
              불꽃톡
            </div>
          </Space>
        </div>
      </div>
      <hr size="1" color="#e8e8e8" />
      <div className="nav"></div>
      <Outlet />
    </>
  );
}
