import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useRouter } from "next/router";

const SignUPComponent: React.FC = (): JSX.Element => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
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
      if (!formData.password || !formData.email || !formData.name) {
        return setError({
          error: true,
          message: "Please fill all the fields",
        });
      }
      const apiResponse = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/user/signup",
        formData
      );
      router.push("/");
    } catch (error: any) {
      setError({
        error: true,
        message: error?.response?.data?.message ?? "Something went wrong",
      });
    }
  };

  return (
    <div className="loginContainer">
      <h1>SignUp</h1>
      {error.error ? (
        <div className="errorElement">{error?.message}</div>
      ) : null}
      <TextField
        label="FullName"
        variant="outlined"
        name="name"
        type="text"
        onChange={handleChange}
        required
      />
      <TextField
        label="UserName"
        variant="outlined"
        name="email"
        type="text"
        required
        onChange={handleChange}
      />
      <TextField
        label="Password"
        variant="outlined"
        name="password"
        type="password"
        required
        onChange={handleChange}
      />
      <Button variant="contained" onClick={handleSubmit}>
        SignUp
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
            Already have an account?
          </div>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant={"text"}
            color="secondary"
            size={"small"}
            onClick={() => router.push("/")}
          >
            Sign In
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUPComponent;
