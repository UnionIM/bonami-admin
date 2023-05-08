import React from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
};

const PageNotFound: React.FC = () => {
  return (
    <div style={styles.container}>
      <Typography variant="h4" style={styles.title}>
        Сторінка не знайдена
      </Typography>
      <Typography variant="body1">Сторінка яку ви шукали не існує</Typography>
      <Button
        variant="contained"
        color="primary"
        style={styles.button}
        component={Link}
        to="/"
      >
        На головну
      </Button>
    </div>
  );
};

export default PageNotFound;
