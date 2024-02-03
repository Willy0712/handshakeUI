import React, { useState, useEffect, useCallback } from "react";
import Cookie from "js-cookie";
import { useDispatch } from "react-redux";
// ... other imports ...

interface CheckCookieProps {
  logout: () => void;
}

const CheckCookie: React.FunctionComponent<CheckCookieProps> = ({ logout }) => {
  const checkBothCookies = () => {
    // const cookie1 = Cookie.get("aspauco");
    // const cookie2 = Cookie.get("auco");
    const cookies = document.cookie.split("; ");
    const allCookies = document.cookie;
    const cookie1 = cookies.find((cookie) => cookie.startsWith("aspauco="));
    const cookie2 = cookies.find((cookie) => cookie.startsWith("auco="));
    console.log(cookie1, cookie2);
    console.log(allCookies);
    return cookie1 && cookie2;
  };

  const [areBothCookiesPresent, setAreBothCookiesPresent] = useState(
    checkBothCookies()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const cookiesPresent = checkBothCookies();
      console.log("Cookies present:", cookiesPresent); // Add this line
      console.log("Cookie1:", Cookie.get("aspauco")); // Add this line
      console.log("Cookie2:", Cookie.get("auco"));
      setAreBothCookiesPresent(cookiesPresent);
      if (!cookiesPresent) {
        console.log("Logging out...");
        logout();
      }
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [logout]);

  // Render your component based on the value of areBothCookiesPresent

  return <div>{/* Your component JSX */}</div>;
};

export default CheckCookie;
