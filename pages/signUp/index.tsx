import React, { useEffect } from "react";
import SignUPComponent from "../../components/SignUp";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const SignUp: React.FC = (): JSX.Element => {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/mealsListing");
    }
  }, [router]);
  return (
    <div className="home-container">
      <SignUPComponent />
    </div>
  );
};

export default SignUp;
