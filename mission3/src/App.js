import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import Button from './Button.js';
import Blog from './Blog.js';
import Picture from './Picture.js'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Button />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/picture" element={<Picture />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
