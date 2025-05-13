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
const validateProductCategegory = require('../middleware/validateProductCategory');

// Routes

// GET all categories
router.get('/', getAllCategories);

// GET category by ID
router.get('/:id', getCategoryById);

// CREATE category with image upload and validation
router.post('/', upload.single('image'), validateProductCategegory, createProductCategory);

// UPDATE category with optional image replacement
router.put('/:id', upload.single('image'), validateProductCategegory, updateCategory);

// DELETE category by ID
router.delete('/:id', deleteCategory);

module.exports = router;
