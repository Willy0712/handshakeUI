import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/auth";
import { RootState } from "../store"; // Import RootState from your store
import CheckCookie from "./AuthMenu/CheckCookie";

import { UnauthenticatedMenu } from "./AuthMenu/AuthMenu";

interface WithBothCookiesCheckProps {
  onLoginOpen: () => void;
  onSignUpOpen: () => void;
}

export function withBothCookiesCheck<T>(
  WrappedComponent: React.ComponentType<T>,
  onLoginOpen: () => void,
  onSignUpOpen: () => void
) {
  return (props: React.PropsWithChildren<T>) => {
    const { user: currentUser } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<any>();

    const logOut = useCallback(() => {
      dispatch(logout());
    }, [dispatch]);

    if (!currentUser) {
      return (
        <UnauthenticatedMenu
          onLoginOpen={onLoginOpen}
          onSignUpOpen={onSignUpOpen}
        />
      );
    }

    return (
      <>
        <CheckCookie logout={logOut} />
        <WrappedComponent {...props} />
      </>
    );
  };
}
