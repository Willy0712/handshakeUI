import { useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { logout } from "../../slices/auth";
import AxiosService from "../../Axios/AxiosService";
import { AppDispatch } from "../../store";

export const useCheckAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const checkAuth = useCallback(async () => {
    try {
      const response = await AxiosService.checkCookies();

      if (response.status !== 200) {
        setIsAuthenticated(false);
        if (!loggingOut) {
          setLoggingOut(true);
          dispatch(logout());
        }
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
      if (!loggingOut) {
        setLoggingOut(true);
        dispatch(logout());
      }
    }
  }, [dispatch, loggingOut]);

  useEffect(() => {
    checkAuth();
    const interval = setInterval(checkAuth, 5000); // Check every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, [checkAuth]);

  return isAuthenticated;
};
