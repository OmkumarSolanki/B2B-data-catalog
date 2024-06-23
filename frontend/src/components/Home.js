
import authService from '../services/authService';

import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  Header  from './Header'
import ProductList from './ProductList';
import ProductRegister from './ProductRegister';
import productService from '../services/productService';

function Home() {
   const navigate = useNavigate();
   const [products, setProducts] = useState([]);
 

  useEffect(() => {
    if (!authService.isLoggedIn()) {
      navigate("/");
    }
    else {
        fetchProducts();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const result = await productService.getProducts();
      setProducts(result.data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };


  return (
    <>

    <Header />
    <ProductRegister onRegister={fetchProducts} />
    <ProductList products={products} />
      
    </>
  );
}

export default Home;
