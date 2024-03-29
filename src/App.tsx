import React, { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import Navbar from "./components/Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createGlobalStyle } from "styled-components";
import BonamiController from "./controllers/BonamiController";
import { Box } from "@mui/material";
import { gray } from "./design/colors";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";
import { IUser } from "./models/bonami-server-response";

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: unset;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: white;
  }

  ::-webkit-scrollbar-thumb {
    background: #B5B5B5;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #808080;
  }
`;

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    BonamiController.isAuth()
      .then((res: IUser) => {
        if (res._id) {
          localStorage.setItem(`isAuth`, JSON.stringify(true));
        }
      })
      .catch((e) => {
        if (e.code !== "ERR_NETWORK" && e.response.status === 401) {
          localStorage.clear();
          navigate("/login");
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
      //MuiButtonBase-root-MuiIconButton-root
      MuiIconButton: {
        styleOverrides: {
          root: {
            marginRight: "0",
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Global />
      <Box
        bgcolor={"#f1f1f1"}
        minHeight={"100vh"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Navbar />
        <AppRouter />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
