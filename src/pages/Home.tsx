import React from "react";
import BonamiController from "../controllers/BonamiController";
import useFetchData from "../hooks/useFetchData";

const Home = () => {
  const { data: user, isLoading } = useFetchData(
    BonamiController.getUser,
    [],
    []
  );

  const log = () => {
    console.log(user);
  };

  return (
    <div>
      home
      <button onClick={log}>get data</button>
    </div>
  );
};

export default Home;
