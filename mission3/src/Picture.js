import React from "react";
import background from "./laputa.jpg";

function Picture() {
  return (
    <div>
      <h1>My Favorite Picture</h1>
      <img src={background} alt="My Favorite" style={{ maxWidth: "100%" }} />
    </div>
  );
}

export default Picture;
