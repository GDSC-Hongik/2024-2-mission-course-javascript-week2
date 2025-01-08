import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Blog() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Blog Page</h1>
      <p>Welcome to the blog page!</p>
      <div>
        <a
        href="https://hi-minji.tistory.com/"
        target="_blank"
        rel="noopener noreferrer"
        >
            tistory
        </a>
      </div>
      <Button label="Back to Home" onClick={() => navigate("/")} />
    </div>
  );
}

export default Blog;
