const ProductCategoryModel = require("../models/ProductCategoryModel");
const ProductModel = require("../models/ProductModel");

// get All product

const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.pageSize) || 10;
    const search = req.query.search || "";
    const skip = (page - 1) * limit;

    // Build search query including isDeleted: false
    const baseFilter = { isDeleted: false };

    const searchFilter = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { slug: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const finalQuery = {
      ...baseFilter,
      ...(search ? { $and: [baseFilter, searchFilter] } : {}),
    };
    const [products, totalItems] = await Promise.all([
          ProductModel.find(finalQuery).populate('category',"name slug").skip(skip).limit(limit),
          ProductModel.countDocuments(finalQuery),
        ]);
     res.json({
      meta: {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
        pageSize: limit,
      },
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get product by Id
const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "ProductModel Not Found" });
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
  const newProduct = new ProductModel({
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

// Update ProductModel

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
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    }).populate("category", "name slug");

    if (!updatedProduct) {
      return res.status(404).json({ message: "ProductModel not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: error.message });
  }
};


// Delete ProductModel by Id

const deleteProduct = async (req, res) => {

  try {
    const deletedProduct = await ProductModel.findByIdAndUpdate(req.params.id,{isDeleted:true},{new:true});
    if (!deletedProduct) {
      return res.status(404).json({ message: "ProductModel Not Found" });
    };
    res.json({ message: "ProductModel Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
