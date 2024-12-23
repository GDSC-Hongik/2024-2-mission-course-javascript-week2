import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={() => navigate("/blog")}>Go to Blog</button>
      <button onClick={() => navigate("/picture")}>Go to Picture</button>
    </div>
  );
}

export default Home;
