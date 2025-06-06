const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
    },
    image: {
      url: { type: String },
      alt: { type: String, default: "" },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    keywords: [{ type: String }],
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  },
  
);

module.exports = mongoose.model('ProductCategory', productCategorySchema);
