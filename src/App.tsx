import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  Home  from './pages/Home';
import  Hero  from './pages/Hero';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hero_characteristics/:hero_name" element={<Hero />} />
      </Routes>
    </Router>
  );
}

export default App;
