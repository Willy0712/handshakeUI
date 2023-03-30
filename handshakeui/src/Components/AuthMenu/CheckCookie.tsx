import React, { useState, useEffect, useCallback } from "react";
import Cookie from "js-cookie";
import { useDispatch } from "react-redux";
// ... other imports ...

interface CheckCookieProps {
  logout: () => void;
}

const CheckCookie: React.FunctionComponent<CheckCookieProps> = ({ logout }) => {
  const checkBothCookies = () => {
    const cookie1 = Cookie.get("aspauco");
    const cookie2 = Cookie.get("auco");
    return cookie1 && cookie2;
  };

  const [areBothCookiesPresent, setAreBothCookiesPresent] = useState(
    checkBothCookies()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const cookiesPresent = checkBothCookies();
      setAreBothCookiesPresent(cookiesPresent);
      if (!cookiesPresent) {
        logout();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [logout]);

  // Render your component based on the value of areBothCookiesPresent

  return <div>{/* Your component JSX */}</div>;
};

export default CheckCookie;
