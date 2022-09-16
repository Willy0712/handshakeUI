import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import classes from "../../Styles/Header.module.scss";
import logo from "../../photos/handshake_logo.png";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <div className={classes.header}>
      <img className={classes.header__icon} src={logo} alt="logo" />

      <div className={classes.header__center}>
        <input type="text" />
        <SearchIcon />
      </div>

      <div className={classes.header__right}>
        <ul>
          <li>Login</li>
          <li>Sign-up</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
