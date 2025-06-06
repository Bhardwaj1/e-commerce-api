const ProductCategoryModel = require("../models/ProductCategoryModel");
const productCategorySchema = require("../validators/productCategoryValidator");
const slugify = require("slugify");

// Get all categories
const getAllCategories = async (req, res) => {
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

    const [categories, totalItems] = await Promise.all([
      ProductCategoryModel.find(finalQuery).skip(skip).limit(limit),
      ProductCategoryModel.countDocuments(finalQuery),
    ]);

    res.json({
      meta: {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
        pageSize: limit,
      },
      data: categories,
    });
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
    const {
      name,
      slug,
      description,
      isActive,
      sortOrder,
      metaTitle,
      metaDescription,
      keywords,
    } = req.body;

    const existingCategory = await ProductCategoryModel.findOne({
      name: name.trim(),
    });
    if (existingCategory) {
      return res.status(400).json({
        message: `${name} category already exists.`,
      });
    }

    let keywordArray = [];
    if (keywords.trim() != "") {
      keywordArray = keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);
    }

    const image = req.file
      ? {
          url: `/uploads/${req.file.filename}`,
          alt: req.file.originalname || "category image",
        }
      : undefined;

    const newCategory = new ProductCategoryModel({
      name: name.trim(),
      slug: slug || slugify(name, { lower: true }),
      description,
      image,
      isActive,
      sortOrder,
      metaTitle,
      metaDescription,
      keywords: keywordArray,
    });

    const savedCategory = await newCategory.save();
    return res.status(201).json(savedCategory);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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

  // const { error } = productCategorySchema(data);
  // if (error) {
  //   return res.status(400).json({
  //     message: "Validation failed",
  //     details: error.details.map((e) => e.message),
  //   });
  // }

  try {
    const updatedCategory = await ProductCategoryModel.findByIdAndUpdate(
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
    const deleted = await ProductCategoryModel.findByIdAndUpdate(req.params.id,{isDeleted:true},{new:true});
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
