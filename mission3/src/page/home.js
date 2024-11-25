import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/velog')}>velog</button>
      <button onClick={() => navigate('/picture')}>picture</button>
    </div>
  );
};

export default Home;
