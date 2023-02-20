import React from "react";

const Login = () => {
  const google = () => {
    window.open("http://localhost:5000/google", "_self");
  };
  return (
    <div>
      dsgdsfgdsfgdfg
      <button onClick={google}>Login with google</button>
    </div>
  );
};

export default Login;
