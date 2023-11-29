// 아직 사용 안함
"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SideMenu from "./Sidemenu";

const MenuBtn = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <FontAwesomeIcon
        icon={faBars}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
      {isMenuOpen && <SideMenu />}
    </div>
  );
};

export default MenuBtn;
