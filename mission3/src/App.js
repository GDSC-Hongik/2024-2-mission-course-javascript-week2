import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Button from "./Button";
import Blog from "./Blog";
import Picture from "./Picture";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Button />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/picture" element={<Picture />}></Route>
      </Routes>
    </div>
  );
}

export default App;
