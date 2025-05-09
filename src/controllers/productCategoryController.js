const ProductCategoryModel = require("../models/ProductCategoryModel");
const { validateParentCategory } = require("../validators/parentCategoryValidator");
const slugify = require("slugify");

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await ProductCategoryModel.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProductCategory = async (req, res) => {
    try {
      // Get form data and the uploaded image
      const { name, slug, description, isActive, sortOrder, metaTitle, metaDescription, keywords } = req.body;
      
      // Handling image upload
      const image = req.file ? { url: `/uploads/${req.file.filename}`, alt: req.file.originalname } : null;
  
      const newCategory = new ProductCategoryModel({
        name,
        slug,
        description,
        image,
        isActive,
        sortOrder,
        metaTitle,
        metaDescription,
        keywords
      });
  
      const savedCategory = await newCategory.save();
      res.status(201).json(savedCategory);  // Return the created category as response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

// Update category
const updateCategory = async (req, res) => {
  const image = req.file ? `uploads/${req.file.filename}` : undefined;

  const data = {
    ...req.body,
    slug: req.body.slug || slugify(req.body.name, { lower: true }),
  };

  if (image) {
    data.image = image;
  }

  const { error } = validateParentCategory(data);
  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      details: error.details.map((e) => e.message),
    });
  }

  try {
    const updatedCategory = await ProductCategory.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );
    if (!updatedCategory)
      return res.status(404).json({ message: "Category not found" });
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const deleted = await ProductCategory.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createProductCategory,
  updateCategory,
  deleteCategory,
};
