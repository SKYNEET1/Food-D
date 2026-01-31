const Joi = require('joi');

const validateCreateShop = async (req, res, next) => {
    console.log(req.body)

    const validateShopSchema = Joi.object({
        name: Joi.string()
            .trim()
            .min(2)
            .max(100)
            .required()
            .messages({
                "string.base": "Shop name must be a text",
                "string.empty": "Shop name is required",
                "string.min": "Shop name must be at least 2 characters long",
                "string.max": "Shop name must not exceed 100 characters",
                "any.required": "Shop name is required",
            }),

        image: Joi.string()
            .uri()
            .required()
            .messages({
                "string.uri": "Shop image must be a valid URL",
                "any.required": "Shop image is required",
            }),

        owner: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
                "string.pattern.base": "Owner must be a valid MongoDB ObjectId",
                "any.required": "Owner is required",
            }),

        ownerEmail: Joi.string()
            .email()
            .optional()
            .messages({
                "string.email": "Owner email must be a valid email address",
            }),

        city: Joi.string()
            .trim()
            .min(2)
            .required()
            .messages({
                "string.base": "City must be a text",
                "string.empty": "City is required",
                "any.required": "City is required",
            }),

        state: Joi.string()
            .trim()
            .min(2)
            .required()
            .messages({
                "string.base": "State must be a text",
                "string.empty": "State is required",
                "any.required": "State is required",
            }),

        address: Joi.string()
            .trim()
            .min(5)
            .required()
            .messages({
                "string.base": "Address must be a text",
                "string.empty": "Address is required",
                "string.min": "Address must be at least 5 characters long",
                "any.required": "Address is required",
            }),

        foodItems: Joi.array()
            .items(
                Joi.string().regex(/^[0-9a-fA-F]{24}$/).messages({
                    "string.pattern.base": "Food item must be a valid MongoDB ObjectId",
                })
            )
            .optional(),
    })

    const { error, value } = validateShopSchema.validate(req.body, {
        abortEarly: false,
        allowUnknown: true
    });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(d => d.message).join(", ")
        });
    }

    req.body = value;
    next();

}

module.exports = { validateCreateShop }