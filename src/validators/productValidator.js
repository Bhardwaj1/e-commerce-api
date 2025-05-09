const Joi = require("joi");

const productValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": "Product name is required",
    "string.empty": "Product name cannot be empty",
  }),
  description: Joi.string().trim().required().messages({
    "any.required": "Product description is required",
    "string.empty": "Product description cannot be empty",
  }),
  price: Joi.number().positive().min(1).required().messages({
    "number.base": "Product price must be a number",
    "number.positive": "Product price must be positive",
    "any.required": "Product price is required",
  }),
  category: Joi.valid(
    "Electronics",
    "Clothing",
    "Books",
    "Beauty",
    "Home",
    "Toys",
    "Other"
  )
    .required()
    .messages({
      "any.only": "Invalid category",
      "any.required": "Product category is required",
    }),
  brand: Joi.string(),
  stock: Joi.number().min(0).required().messages({
    "number.base": "Product Stock must be number",
    "number.min": "Product Stock cannot be negative",
    "any.required": "Product Stock is required",
  }),
  images: Joi.array().items(
    Joi.object({
      url: Joi.string().uri().required().messages({
        "string.uri": "Product image URL must be valid",
        "any.uri": "Product image is required",
      }),
      alt: Joi.string().allow('').messages({
        'string.base': 'Alt must be a string'
      })
    })
  ),
  ratings:Joi.number(),
  numReviews:Joi.number(),
  isFeatured:Joi.boolean()
});

module.exports=productValidationSchema