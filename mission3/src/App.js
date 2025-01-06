import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Home";
import Blog from "./Blog";
import Picture from "./Picture";
import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/picture" element={<Picture />} />
      </Routes>
    </div>
  );
}

export default App;