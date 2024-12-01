import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Blog from './Blog';
import Picture from './Picture';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
                    <Route path="/" element={<Main />}></Route>
					<Route path="/blog" element={<Blog />}></Route>
                    <Route path="/picture" element={<Picture />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;