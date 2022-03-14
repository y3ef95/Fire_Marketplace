import React, { useState } from "react";
import "scss/Nav.scss";
import { MenuOutlined } from "@ant-design/icons";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="nav_menu">
      <MenuOutlined onClick={onClick} />
      {isOpen ? (
        <div className="menu">
          <ul className="menu_list">
            <div className="list_name">전체 리스트</div>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
