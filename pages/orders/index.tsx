import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import axios from "axios";
import Cookies from "js-cookie";

const Orders: React.FC = (): JSX.Element => {
  const [ordersList, setOrdersList] = useState<any>([]);
  const getOrders = async (token: string) => {
    try {
      axios.defaults.headers.token = token;
      const apiResponse = await axios.get(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/orders"
      );
      setOrdersList(apiResponse?.data?.data?.orders ?? []);
    } catch (error) {
      console.log("error=====>", error);
    }
  };
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      getOrders(token);
    }
  }, []);
  return (
    <>
      <Header />
      {ordersList.length > 0 ? (
        <div className="orders-list">
          {ordersList.map((order: any) => (
            <div className="meals-card" key={order?._id}>
              <div className="meals-card-header">{order?.orderName}</div>
              <div className="meals-card-description">
                Each Friend Cost :
                {parseInt((order?.bill / order?.friends).toString())}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No Orders Found</div>
      )}
    </>
  );
};

export default Orders;
