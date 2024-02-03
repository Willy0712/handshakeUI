import React, { useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import classes from "../../Styles/Header.module.scss";
import logo from "../../photos/handshake_logo.png";
import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import DialogModel from "../../Helpers/DialogModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/auth";
import { AuthenticatedMenu, UnauthenticatedMenu } from "../AuthMenu/AuthMenu";
// import { withBothCookiesCheck } from "../withBothCookiesCheck";

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

  // const SecureAuthenticatedMenu = withBothCookiesCheck(
  //   AuthenticatedMenu,
  //   handleDialogOpen,
  //   handleOpen
  // );

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
          <>
            <UnauthenticatedMenu
              onLoginOpen={handleDialogOpen}
              onSignUpOpen={handleOpen}
            />
            <DialogModel
              title="Login"
              // children={<SignIn />}
              isOpen={isOpen}
              handleClose={handleDialogClose}
              indexTab={0}
            />
            <DialogModel
              title="Sign-up"
              // children={<SignUp />}
              isOpen={isOpenDialog}
              handleClose={handleClose}
              indexTab={1}
            />
          </>
        ) : (
          <AuthenticatedMenu onLogout={logOut} />
        )}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Header;
