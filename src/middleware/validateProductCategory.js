const productCategorySchema = require("../validators/productCategoryValidator");

const validateProductCategegory = (req, res, next) => {
  const { error } = productCategorySchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};
module.exports = validateProductCategegory;
