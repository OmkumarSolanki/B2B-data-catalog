const mongoose = require('mongoose');

uniqueId = 0;

const ProductSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  dataCategory: {
    type: String,
    required: true,
  },
  recordCount: {
    type: Number,
    required: true,
  },
  fields: {
    type: [String],
    required: true,
  },
  productId: {
    type: String,
    unique: true,
    default: function() {
      uniqueId++;
      return uniqueId;
    },
  },
});

module.exports = mongoose.model('Product', ProductSchema);
