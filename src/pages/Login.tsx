import React, { ChangeEvent, useState, FormEvent } from "react";
import {
  Box,
  Button,
  Grid,
  Card,
  TextField,
  CardContent,
  Alert,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import axios from "axios";
import PasswordTextField from "../components/UI/Inputs/PasswordTextField";

const Login = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [failure, setFailure] = useState<boolean>(false);

  const google = () => {
    window.open("http://localhost:5000/google", "_self");
  };
  const local = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios({
      method: "POST",
      data: {
        email: email,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:5000/local",
    })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem(`isAuth`, JSON.stringify(true));
          window.location.href = "http://localhost:3000";
        }
      })
      .catch((e) => {
        if (!e.response.data.success) {
          setFailure(true);
        }
        console.log(e);
      });
  };

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Grid container justifyContent={"center"} p={"32px"}>
      <Card
        sx={{
          width: "375px",
        }}
      >
        <CardContent>
          <form onSubmit={local}>
            <TextField
              value={email}
              onChange={emailHandler}
              fullWidth={true}
              variant={"outlined"}
              label={"Email"}
            />
            <PasswordTextField
              m={"20px 0 0 0"}
              onChange={passwordHandler}
              value={password}
            />
            {failure ? (
              <Alert
                severity="error"
                onClose={() => {
                  setFailure(false);
                }}
                sx={{ mt: "20px" }}
              >
                Wrong email or password
              </Alert>
            ) : (
              <Box height={30} />
            )}
            <Button type="submit" sx={{ mt: 2 }} fullWidth={true}>
              Sign in
            </Button>
          </form>
          <Button
            sx={{ mt: 5, width: "100%" }}
            onClick={google}
            startIcon={<Google />}
          >
            Sign in with google
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Login;
