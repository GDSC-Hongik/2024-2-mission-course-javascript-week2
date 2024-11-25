import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/home';
import Velog from './page/velog';
import Picture from './page/picture';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Velog" element={<Velog />} />
        <Route path="/Picture" element={<Picture />} />
      </Routes>
    </Router>
  );
};

export default App;
