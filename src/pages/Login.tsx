import React, { ChangeEvent, useState, FormEvent } from "react";
import {
  Box,
  Button,
  Grid,
  Card,
  TextField,
  CardContent,
  Alert,
  AlertColor,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import PasswordTextField from "../components/UI/Inputs/PasswordTextField";
import BonamiService from "../services/BonamiService";
import MyAlert from "../components/UI/MyAlert";

const Login = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [failure, setFailure] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<{
    isOpen: boolean;
    message: string;
    severity: AlertColor;
  }>({ isOpen: false, message: "", severity: "info" });

  const google = () => {
    window.open("http://localhost:5000/google", "_self");
  };
  const local = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    BonamiService.localLogin(email, password, setFailure, setOpenSnackbar);
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
      <MyAlert state={openSnackbar} setState={setOpenSnackbar}>
        <>{openSnackbar.message}</>
      </MyAlert>
    </Grid>
  );
};

export default Login;
