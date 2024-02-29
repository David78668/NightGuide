import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddDrink from './pages/AddDrink';
import Home from './pages/Home'
import RecentCalculations from './pages/RecentCalculations';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddDrink" element={<AddDrink />} />
        <Route path='/Calculations' element={<RecentCalculations />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();