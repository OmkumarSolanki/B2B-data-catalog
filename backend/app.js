const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

connectDB();

const corsOptions = {
    origin: "http://localhost:3000", // replace with the actual origin of your frontend
    credentials: true,
  };

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/', require('./routes/authRoutes'));
app.use('/products', require('./routes/productRoutes'));

module.exports = app;
