import React from "react";
import classes from "../../Styles/Header.module.scss";

interface AuthenticatedMenuProps {
  onLogout: () => void;
}

interface UnauthenticatedMenuProps {
  onLoginOpen: () => void;
  onSignUpOpen: () => void;
}

export const AuthenticatedMenu: React.FC<AuthenticatedMenuProps> = ({
  onLogout,
}) => (
  <div className={classes.header__right}>
    <ul>
      <li>Upload</li>
      <li>Profile</li>
      <li>Money</li>
      <li onClick={onLogout}>Logout</li>
    </ul>
  </div>
);

export const UnauthenticatedMenu: React.FC<UnauthenticatedMenuProps> = ({
  onLoginOpen,
  onSignUpOpen,
}) => (
  <div className={classes.header__right}>
    <ul>
      <li onClick={onLoginOpen}>Login</li>
      <li onClick={onSignUpOpen}>Sign-up</li>
    </ul>
  </div>
);
