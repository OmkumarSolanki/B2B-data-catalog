import React from 'react';
import { Card } from 'react-bootstrap';

function ProductItem({ product }) {
  console.log(product);
  return (
    <Card className="product-item mb-3">
      <Card.Body>
        <Card.Text>
          <b>Product ID:</b> {product.productId} 
          <br />
          <b>Category:</b> {product.dataCategory} 
          <br />
          <b>Record Count:</b> {product.recordCount}
          <br />
          <b>Fields:</b> {product.fields.join(', ')}
          <br />
          <b>Created By:</b> {product.email}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductItem;
