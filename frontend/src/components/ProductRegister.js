import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import productService from '../services/productService';
import '../styles/ProductRegister.css'

function ProductRegister({ onRegister }) {
  const [dataCategory, setDataCategory] = useState('');
  const [recordCount, setRecordCount] = useState('');
  const [fields, setFields] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const fieldsArray = fields.split(',').map(field => field.trim());

    try {
      await productService.registerProduct({
        dataCategory,
        recordCount,
        fields: fieldsArray,
      });
      setSuccess('Product registered successfully.');
      setDataCategory('');
      setRecordCount('');
      setFields('');
      onRegister();
    } catch (err) {
      setError('Failed to register product.');
    }
  };

  return (
    <div className="product-register-form">
      <h2 className='RegisterProductHeading'>Register Product</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formDataCategory">
          <Form.Label>Data Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter data category"
            value={dataCategory}
            onChange={(e) => setDataCategory(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formRecordCount">
          <Form.Label>Record Count</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter record count"
            value={recordCount}
            onChange={(e) => setRecordCount(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formFields">
          <Form.Label>Fields</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter fields separated by commas"
            value={fields}
            onChange={(e) => setFields(e.target.value)}
          />
        </Form.Group>

        <Row className="mt-3">
          <Col className="d-flex justify-content-center">
            <Button variant="primary" type="submit" style={ {width : '100%' }}>
              Register Product
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default ProductRegister;
