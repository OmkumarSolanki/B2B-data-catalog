import React, { useState, useEffect } from 'react';
import productService from '../services/productService';
import { Card, Row, Col } from 'react-bootstrap';
import ProductItem from './ProductItem';

import '../styles/Product.css'

function ProductList({ products }) {

  // console.log(products.length);
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await productService.getProducts();
  //       setProducts(result.data);
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="product-list">
      <div className='Products'>
        <h3>Products</h3>
      </div>
      <Row className="product-grid mt-3">
        {products && products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <ProductItem product={product} />
          </Col>
        ))}
        {products.length == 0 &&
          <div className='Products'>
            <h4>Please Register for Products</h4>
          </div>
        }
      </Row>
    </div>
  );
}

export default ProductList;
