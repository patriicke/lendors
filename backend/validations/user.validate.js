const Joi = require("joi");

exports.createUserSchemaValidation = Joi.object({
  names: Joi.string().required().min(5).max(40),
  email: Joi.string().email().required().min(4).max(40),
  address: Joi.string().required().min(3).max(40),
  telephone: Joi.string().required(),
  password: Joi.string().min(4).max(16)
});

exports.upateUserSchemaValidation = Joi.object({
  names: Joi.string().required().min(5).max(40),
  email: Joi.string().email().required().min(4).max(40),
  address: Joi.string().required().min(3).max(40),
  telephone: Joi.string().required()
});

exports.updatePasswordValidation = Joi.object({
  oldPassword: Joi.string().min(4).max(16),
  newPassword: Joi.string().min(4).max(16)
});

exports.deleteUserSchemaValidation = Joi.object({
  password: Joi.string().min(4).max(16)
});
