import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import CricketVenues from './CricketVenues';
import FormatPage from './FormatPage';
import PricePage from './PricePage';
import BookPage from './BookPage';
import SubmitForm from './SubmitForm';
import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/venues" element={<CricketVenues />} />
        <Route path="/format" element={<FormatPage />} />
        <Route path="/price" element={<PricePage />} />
        <Route path="/book/:id" element={<BookPage />} />
        <Route path="/submit" element={<SubmitForm />} />
        
      </Routes>
    </>
  );
};

export default App;