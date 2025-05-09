const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

// Import controller functions
const {
  getAllCategories,
  getCategoryById,
  createProductCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/productCategoryController');
const { validateParentCategory } = require('../validators/parentCategoryValidator');

// Routes

// GET all categories
router.get('/', getAllCategories);

// GET category by ID
router.get('/:id', getCategoryById);

// CREATE category with image upload and validation
router.post('/', upload.single('image'), validateParentCategory, createProductCategory);

// UPDATE category with optional image replacement
router.put('/:id', upload.single('image'), validateParentCategory, updateCategory);

// DELETE category by ID
router.delete('/:id', deleteCategory);

module.exports = router;
