const mongoose = require("mongoose");
const { productEnum } = require("../constants/enum");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product description in required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price must be positive"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
    required: [true, "Product category is required"],
  },
  brand: {
    type: String,
    default: "Generic",
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "Stock cannot be nagative"],
  },
  images: [
    {
      url: { type: String, required: [true, "Product image is required"] },
      alt: { type: String, default: "" },
    },
  ],
  ratings: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});
module.exports = mongoose.model("Product", productSchema);;
