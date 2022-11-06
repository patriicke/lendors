const Joi = require("joi");

exports.createRequestSchemaValidation = Joi.object({
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
  pickupLocation: Joi.string().required(),
  carId: Joi.string().required()
});
