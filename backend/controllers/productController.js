const Product = require('../models/product');

exports.createProduct = async (req, res) => {
  const { dataCategory, recordCount, fields } = req.body;
  const { email } = req.user; 
  try {
    const newProduct = new Product({
      dataCategory,
      recordCount,
      fields,
      email,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  let query;

  query = { productId: id };
  

  try {
    const product = await Product.findOne(query);
    if (!product) {
      return res.status(404).json({ result: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};