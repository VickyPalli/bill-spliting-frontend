import React from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

const Header: React.FC = (): JSX.Element => {
  const router = useRouter();

  const logoutHandler = () => {
    Cookie.remove("token");
    router.push("/");
  };

  return (
    <div className="header-container">
      <div
        onClick={() => router.push("/mealsListing")}
        className="header-element"
      >
        Home
      </div>
      <div className="header-element" onClick={() => router.push("/orders")}>
        Orders
      </div>
      <div className="header-element" onClick={() => logoutHandler()}>
        Logout
      </div>
    </div>
  );
};

export default Header;
