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
        Page Not Found
      </Typography>
      <Typography variant="body1">
        The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={styles.button}
        component={Link}
        to="/"
      >
        Go to Home Page
      </Button>
    </div>
  );
};

export default PageNotFound;
