import React, { useState } from 'react';
import productService from '../services/productService';
import { Form, Row, Col, Card } from 'react-bootstrap';
import Header from './Header';
import '../styles/Search.css';

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const result = await productService.getProductById(searchTerm);
            setProduct(result.data);
            setError('');
        } catch (err) {
            setProduct(null);
            setError('Product not found');
        }
    };

    return (
        <>
            <Header />
            <div>
                <div className="search-container">
                    <h4 style={{ display: 'flex', justifyContent: 'center' }} >Search by Product ID</h4>
                    <Form onSubmit={handleSearch}>
                        <Form.Group as={Row} controlId="formSearch">
                            <Col sm={12}>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Product ID"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <button style={{width : '100%'}} type="submit" className="btn btn-primary mt-3" disabled={!searchTerm.trim()}>Search</button>
                    </Form>
                </div>

                <div className="product-details mt-3">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {product && (
                        <Card>
                            <Card.Body>
                                <Card.Text>
                                    <b>Product ID:</b> {product.productId} <br />
                                    <b>Category:</b> {product.dataCategory} <br />
                                    <b>Record Count:</b> {product.recordCount} <br />
                                    <b>Fields:</b> {product.fields.join(', ')} <br />
                                    <b>Created By:</b> {product.email} <br />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
}

export default Search;
