import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import GetProducts from './GetProducts';
import SingleProduct from './SingleProduct';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/getProductsWithFilters" element={<GetProducts />} /> 
        <Route path="/product/:id" element={<SingleProduct />} />  
       
      </Routes>
    </Router>
  )
}

export default App