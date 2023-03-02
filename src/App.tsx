import React, { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import Navbar from "./components/Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createGlobalStyle } from "styled-components";
import BonamiController from "./controllers/BonamiController";
import { Box } from "@mui/material";

function App() {
  const Global = createGlobalStyle`
    *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    a{
      text-decoration: none;
      color: unset;
    }
  `;
  useEffect(() => {
    BonamiController.isAuth()
      .then((res: { isAuth: boolean }) => {
        if (res.isAuth) {
          localStorage.setItem(`isAuth`, JSON.stringify(true));
        }
      })
      .catch((e) => {
        if (e.response.status === 401) {
          localStorage.clear();
        }
      });
  }, []);
  const theme = createTheme({
    typography: {
      fontFamily: `Roboto`,
      fontSize: 16,
      fontWeightRegular: 400,
      fontWeightBold: 700,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Global />
      <Box bgcolor={"#f1f1f1"} height={"100vh"}>
        <Navbar />
        <AppRouter />
      </Box>
    </ThemeProvider>
  );
}

export default App;
