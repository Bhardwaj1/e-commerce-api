const Joi = require('joi');

const productCategorySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.base': 'Name must be a string.',
      'string.empty': 'Name is required.',
      'string.min': 'Name must be at least 2 characters.',
      'string.max': 'Name cannot exceed 50 characters.',
      'any.required': 'Name is required.'
    }),

  slug: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .required()
    .messages({
      'string.pattern.base': 'Slug must be lowercase and hyphen-separated (e.g., electronics-accessories).',
      'any.required': 'Slug is required.'
    }),

  description: Joi.string()
    .max(500)
    .optional(),

  image: Joi.string()
    .uri()
    .optional()
    .messages({
      'string.uri': 'Image must be a valid URL.'
    }),

  isActive: Joi.boolean()
    .optional(),

  sortOrder: Joi.number()
    .integer()
    .min(0)
    .optional(),

  metaTitle: Joi.string()
    .max(60)
    .optional(),

  metaDescription: Joi.string()
    .max(160)
    .optional(),

  keywords: Joi.array()
    .items(Joi.string())
    .optional(),
});

module.exports =  productCategorySchema
