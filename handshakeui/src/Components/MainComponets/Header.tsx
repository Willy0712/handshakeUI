import React, { useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import classes from "../../Styles/Header.module.scss";
import logo from "../../photos/handshake_logo.png";
import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import DialogModel from "../../Helpers/DialogModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/auth";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);

  const { user: currentUser } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<any>();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleDialogOpen = () => {
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpenDialog(true);
  };

  const handleClose = () => {
    setIsOpenDialog(false);
  };

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

        {!currentUser ? (
          <div className={classes.header__right}>
            <ul>
              <li onClick={handleDialogOpen}>Login</li>
              <DialogModel
                title="Login"
                // children={<SignIn />}
                isOpen={isOpen}
                handleClose={handleDialogClose}
                indexTab={0}
              />

              <li onClick={handleOpen}>Sign-up</li>
              <DialogModel
                title="Sign-up"
                // children={<SignUp />}
                isOpen={isOpenDialog}
                handleClose={handleClose}
                indexTab={1}
              />
            </ul>
          </div>
        ) : (
          <div className={classes.header__right}>
            <ul>
              <li>Upload</li>
              <li>Profile</li>
              <li>Money</li>
              <li onClick={logOut}>Logout</li>
            </ul>
          </div>
        )}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Header;
