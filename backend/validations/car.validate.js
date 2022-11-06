const Joi = require("joi");

exports.createCarSchemaValidation = Joi.object({
  name: Joi.string().required().min(4).max(40),
  brand: Joi.string().required().min(3).max(40),
  price: Joi.number().required(),
  currency: Joi.string().required(),
  imageUrl: Joi.string().required(),
  description: Joi.string().required(),
  added: Joi.string().required().default(Date.now())
});
