import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const LoginComponent: React.FC = (): JSX.Element => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setError({
        error: false,
        message: "",
      });
      if (!formData.password || !formData.email) {
        return setError({
          error: true,
          message: "Please fill all the fields",
        });
      }
      const apiResponse = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/user/signin",
        formData
      );
      Cookies.set("token", apiResponse?.data?.data?.token);
      router.push("/mealsListing");
    } catch (error: any) {
      setError({
        error: true,
        message: error?.response?.data?.message ?? "Something went wrong",
      });
    }
  };
  return (
    <div className="loginContainer">
      <h1>Login</h1>
      {error.error ? (
        <div className="errorElement">{error?.message}</div>
      ) : null}
      <TextField
        id="outlined-basic"
        label="UserEmail"
        variant="outlined"
        name="email"
        type="text"
        onChange={handleChange}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        name="password"
        type="password"
        onChange={handleChange}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Login
      </Button>
      <Grid container>
        <Grid item xs={6}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            Dont have an account?
          </div>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant={"text"}
            color="secondary"
            size={"small"}
            onClick={() => router.push("/signUp")}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginComponent;
