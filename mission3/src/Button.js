import React from "react";
import { Link } from "react-router-dom";

const Button = () => (
  <ul>
    <button>
      <Link to="/picture">사진</Link>
    </button>
    <br></br>
    <button>
      <Link to="/blog">블로그</Link>
    </button>
  </ul>
);

export default Button;
