const productValidationSchema = require("../validators/productValidator");

const validateProduct = (req, res, next) => {
  const { error } = productValidationSchema.validate(req.body, {
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
module.exports = validateProduct;
