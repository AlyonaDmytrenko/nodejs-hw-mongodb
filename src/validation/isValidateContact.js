import Joi from 'joi';

export const contactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name must be at most 20 characters long',
      'any.required': 'Name is required',
    }),

  phoneNumber: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.min': 'Phone number must be at least 3 characters long',
      'string.max': 'Phone number must be at most 20 characters long',
      'any.required': 'Phone number is required',
    }),

  email: Joi.string()
    .email()
    .optional()
    .messages({
      'string.email': 'Email must be a valid email address',
    }),

  isFavourite: Joi.boolean().optional(),

  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal')
    .optional()
    .messages({
      'any.only': 'Contact type must be one of "work", "home", or "personal"',
    }),
});
