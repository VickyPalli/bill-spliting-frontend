import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Header from "../../components/Header";
import { Button } from "@mui/material";
import MealCard from "../../components/MealCard";

const MearlsListing = () => {
  const [mealsListing, setMealsListing] = useState<any>([]);

  const getMeals = async (token: string) => {
    try {
      axios.defaults.headers.token = token;
      const apiResponse = await axios.get(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/orders/meals-listing"
      );
      setMealsListing(apiResponse?.data?.data?.meals ?? []);
    } catch (error) {
      console.log("error=====>", error);
    }
  };
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      getMeals(token);
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="meals-list">
        {mealsListing.map((meal: any) => (
          <MealCard mealCardData={meal} key={meal?._id} />
        ))}
      </div>
    </div>
  );
};

export default MearlsListing;
