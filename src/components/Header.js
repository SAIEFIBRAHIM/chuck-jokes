import React, { useState } from "react";
import MEINPNG from "../assets/frontend1/shape@3x.png";
import DROPPNG from "../assets/frontend1/path_2@3x.png";

const Header = () => {
  const [dropDown, setDropDown] = useState("none");
  const handleDropDown = (e) => {
    e.stopPropagation();
    dropDown === "none" ? setDropDown("flex") : setDropDown("none");
  };
  document.body.addEventListener("click", () =>
    dropDown === "flex" ? setDropDown("none") : null
  );
  return (
    <div className="header">
      <ul className="navbar">
        <li>SO FUNKTIONIERT'S</li>
        <li>SONDERANGEBOTE</li>
        <li
          onClick={(e) => {
            handleDropDown(e);
          }}
        >
          <div className="dropper">
            <img className="profile" src={MEINPNG} alt="Profile" />
            <ul className="dropdown" style={{ display: dropDown }}>
              <li>My published jokes</li>
              <hr className="dropdown-hr" />
              <li>My saved jokes</li>
              <hr className="dropdown-hr" />
              <li>Account information</li>
              <hr className="dropdown-hr" />
              <li className="new-joke">Publish new joke</li>
            </ul>
            MEIN BEREICH
            <img className="arrow" src={DROPPNG} alt="Dropdown" />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Header;
