import React from "react";
import { Link } from "react-router-dom";

function Blog() {
  return (
    <div>
      <h1>Visit My Blog</h1>
      <div>
        <Link to="https://velog.io/@brayden1102/posts" target="_blank">
          Go to My Blog
        </Link>
      </div>
    </div>
  );
}

export default Blog;
