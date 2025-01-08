import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "./mongmo.png"
import Button from "./Button";

function Picture() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Picture Page</h1>
      <img
        src={Image}
        alt="Favorite"
        style={{ width: "30%", height: "auto", margin: "20px 0" }}
      />
      <div>
        <Button label="Back to Home" onClick={() => navigate("/")} />
      </div>
    </div>
  );
}

export default Picture;
