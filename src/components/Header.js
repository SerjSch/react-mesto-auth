import logo from "../images/logo-vector.svg";
import React from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Header(props) {
  const curentUser = React.useContext(CurrentUserContext);
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип сайта Mesto" />
      <div className="header__data">
        <p className="header__email">{curentUser.email}</p>
        <Link className="header__link" to={props.link} onClick={props.onClick}>
          {props.text}
        </Link>
      </div>
    </header>
  );
}

export default Header;
