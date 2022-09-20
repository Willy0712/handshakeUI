import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import classes from "../../Styles/Header.module.scss";
import logo from "../../photos/handshake_logo.png";
import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <Fragment>
      <div className={classes.header}>
        <Link to="/">
          <img className={classes.header__icon} src={logo} alt="logo" />
        </Link>

        <div className={classes.header__center}>
          <input type="text" />
          <SearchIcon />
        </div>

        <div className={classes.header__right}>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>Sign-up</li>
          </ul>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Header;
