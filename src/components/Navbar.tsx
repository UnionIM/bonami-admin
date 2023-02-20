import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const logOutHandler = () => {
    window.open("http://localhost:5000/logout");
  };
  return (
    <nav>
      <Link to={"/"}>Home</Link>
      <Link to={"/login"}>Login</Link>
      <button onClick={logOutHandler}>LogOut</button>
    </nav>
  );
};

export default Navbar;
