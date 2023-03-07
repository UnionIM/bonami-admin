import React, { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import Navbar from "./components/Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createGlobalStyle } from "styled-components";
import BonamiController from "./controllers/BonamiController";
import { Box } from "@mui/material";
import { gray } from "./design/colors";
import Footer from "./components/Footer";

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

function App() {
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
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            padding: "25px",
            borderRadius: "8px",
            backgroundColor: "white",
            boxShadow: `0px 0px 5px ${gray.dark}`,
            display: "inline-block",
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            ".MuiFormLabel-root": {
              top: "-4px",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            ".MuiInputBase-input": {
              padding: "0",
            },
            ".MuiInputBase-root": {
              padding: "0",
            },
            ".MuiOutlinedInput-input": {
              padding: "11px 17px",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            ".MuiInputBase-input": {
              padding: "0",
            },
            ".MuiOutlinedInput-input": {
              padding: "11px 17px",
            },
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Global />
      <Box bgcolor={"#f1f1f1"} height={"100%"}>
        <Navbar />
        <AppRouter />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
