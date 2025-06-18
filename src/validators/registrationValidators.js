const Joi = require("joi");

const registrationValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().trim().lowercase().required().messages({
    "string.email": "Email must be a valid email",
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long",
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
  }),
  phone: Joi.string().pattern(/^\d{10,}$/).required().messages({
    "string.pattern.base": "Phone number must be at least 10 digits",
    "string.empty": "Phone number cannot be empty",
    "any.required": "Phone number is required",
  }),
  role: Joi.string().valid("customer", "admin").default("customer").messages({
    "any.only": "Role must be either 'customer' or 'admin'",
  }),
});

module.exports = registrationValidationSchema;
