import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Register from './components/Register';
import Home from './components/Home';
import Search from './components/Search';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path='/search' element={<Search />} />
        </Routes>
    </Router>
  );
}

export default App;
