const Joi = require('joi');

const validateCreateShop = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().trim().min(2).max(100).required(),
        city: Joi.string().trim().min(2).required(),
        state: Joi.string().trim().min(2).required(),
        address: Joi.string().trim().min(5).required(),
    });

    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: true
    });

    if (error) {
        return res.status(400).json({
            success: false,
            source: "joi",
            type: "VALIDATION_ERROR",
            errors: error.details.map(d => ({
                field: d.path.join("."),
                message: d.message
            }))
        });
    }

    req.body = value;
    next();
};


// Validate getAllShopByCity params
const validateCityParam = (req, res, next) => {
  const schema = Joi.object({
    city: Joi.string()
      .trim()
      .min(2)
      .max(50)
      .required()
      .messages({
        "string.base": "City must be a string",
        "string.empty": "City cannot be empty",
        "string.min": "City must be at least 2 characters",
        "any.required": "City is required"
      })
  });

  const { error,value } = schema.validate(req.params);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }

  req.params = value;
  next();
};


module.exports = { validateCreateShop, validateCityParam };
