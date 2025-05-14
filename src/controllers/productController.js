const ProductCategoryModel = require("../models/ProductCategoryModel");
const Product = require("../models/productModel");

// get All product

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category","name slug _id");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

// get product by Id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product Not Found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create product

const createProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    brand,
    stock,
    ratings,
    numReviews,
    isFeatured,
  } = req.body;

  const imageFiles = req.files;
  const images = imageFiles.map((file) => ({
    url: `uploads/${file.filename}`,
    alt: file.originalname,
  }));
  const categoryExists = await ProductCategoryModel.findById(req.body.category);
  if (!categoryExists) {
    return res.status(400).json({ message: "Invalid category ID" });
  }
  const newProduct = new Product({
    name,
    description,
    price,
    category,
    brand,
    stock,
    images,
    ratings,
    numReviews,
    isFeatured,
  });
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Extract fields from request body
    const {
      name,
      description,
      price,
      category,
      brand,
      stock,
      ratings,
      numReviews,
      isFeatured,
    } = req.body;

    // Optional: validate category existence
    if (category) {
      const categoryExists = await ProductCategoryModel.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
    }

    // Optional: Handle images if sent
    let images;
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => ({
        url: `uploads/${file.filename}`,
        alt: file.originalname,
      }));
    }

    // Build update object
    const updatedData = {
      name,
      description,
      price,
      category,
      brand,
      stock,
      ratings,
      numReviews,
      isFeatured,
    };

    if (images) {
      updatedData.images = images;
    }

    // Remove undefined fields
    Object.keys(updatedData).forEach(
      (key) => updatedData[key] === undefined && delete updatedData[key]
    );

    // Update and return the product
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    }).populate("category", "name slug");

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: error.message });
  }
};


// Delete Product by Id

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product Not Found" });
    };
    res.json({ message: "Product Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
