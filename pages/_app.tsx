import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    let pathName = router?.route;
    if (token) {
      if (pathName === "/" || pathName === "/signUp") {
        router.push("/mealsListing");
      }
    } else {
      router.push("/");
    }
  }, []);
  return (
    <div className="meals-container">
      <Component {...pageProps} />
    </div>
  );
}
