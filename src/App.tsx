import React, { useEffect } from "react";

function App() {
  const getCatalog = async () => {
    const res = await fetch("http://localhost:5000/catalog");
    return await res.json();
  };

  useEffect(() => {
    getCatalog()
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  }, []);

  return <div className="App"></div>;
}

export default App;
