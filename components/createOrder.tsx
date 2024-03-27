import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

interface props {
  mealData: any;
  handleClose: () => void;
}
const CreateOrder: React.FC<props> = ({
  mealData,
  handleClose,
}): JSX.Element => {
  const [formData, setFormData] = useState({
    friends: "",
    bill: mealData?.price,
    orderItemId: mealData?.id,
    orderName: mealData?.foodName,
  });

  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setError({
        error: false,
        message: "",
      });
      if (!formData.friends) {
        return setError({
          error: true,
          message: "Please add friends",
        });
      }
      if (isNaN(Number(formData.friends))) {
        return setError({
          error: true,
          message: "freinds should be number",
        });
      }
      if (Number(formData.friends) <= 0) {
        return setError({
          error: true,
          message: "freinds should be greater than 0",
        });
      }
      const token = Cookies.get("token");
      if (token) axios.defaults.headers.token = token;
      await axios
        .post(process.env.NEXT_PUBLIC_API_BASE_URL + "/orders/create", {
          ...formData,
          friends: Number(formData.friends),
        })
        .then(() => {
          handleClose();
        });
    } catch (error: any) {
      setError({
        error: true,
        message: error?.response?.data?.message ?? "Something went wrong",
      });
    }
  };

  return (
    <div className="create-order-container">
      {error.error ? (
        <div className="errorElement">{error?.message}</div>
      ) : null}
      <div className="meals-card-description">
        Item Name: {mealData?.foodName}
      </div>
      <div className="meals-card-description">
        Total Cost: {mealData?.price}
      </div>
      <TextField
        id="outlined-basic"
        label="add friends"
        variant="outlined"
        name="friends"
        type="text"
        value={formData?.friends}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <div>
        <Button
          variant={"contained"}
          size={"small"}
          onClick={() => handleSubmit()}
        >
          submit
        </Button>
      </div>
    </div>
  );
};

export default CreateOrder;
