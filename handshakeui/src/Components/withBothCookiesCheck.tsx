import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/auth";
import { RootState, AppDispatch } from "../store"; // Import RootState from your store
import { useCheckAuth } from "../Components/AuthMenu/CheckAuth";

import { UnauthenticatedMenu } from "./AuthMenu/AuthMenu";

export function withBothCookiesCheck<T>(
  WrappedComponent: React.ComponentType<T>,
  onLoginOpen: () => void,
  onSignUpOpen: () => void
) {
  return (props: React.PropsWithChildren<T>) => {
    const { user: currentUser } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useCheckAuth();

    // Use the useCheckAuth hook
    const logOut = useCallback(() => {
      dispatch(logout());
    }, [dispatch]);

    if (!currentUser || !isAuthenticated) {
      logOut();
      return (
        <UnauthenticatedMenu
          onLoginOpen={onLoginOpen}
          onSignUpOpen={onSignUpOpen}
        />
      );
    }

    return <WrappedComponent {...props} />;
  };
}
