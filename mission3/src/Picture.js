import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "./mongmo.jpg"
import Button from "./Button";

function Picture() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Picture Page</h1>
      <img
        src={Image}
        alt="Favorite cutie"
        style={{ width: "20%", height: "auto", margin: "20px 0" }}
      />
      <div>
        My name is Mongmo 🐶❤️
      </div>
      <div>
        <Button label="Back to Home" onClick={() => navigate("/")} />
      </div>
    </div>
  );
}

export default Picture;
