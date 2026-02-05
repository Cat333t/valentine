import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Question from './pages/Question';
import Thank from './pages/Thank';
import './App.css';

function App(): React.ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/question" element={<Question />} />
      <Route path="/thank" element={<Thank />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
