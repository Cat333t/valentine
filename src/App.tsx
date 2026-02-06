import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Question from './pages/Question';
import Thank from './pages/Thank';
import './App.css';

function App(): React.ReactElement {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirect');
    if (redirectPath) {
      sessionStorage.removeItem('redirect');
      navigate(redirectPath);
    }
  });
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question" element={<Question />} />
        <Route path="/thank" element={<Thank />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <p className="author">Сделано с <span className="heart">♥</span> от Кости для Ники</p>
    </>
  );
}

export default App;
