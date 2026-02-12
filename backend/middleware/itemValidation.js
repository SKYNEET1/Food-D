const joi = require('joi');

const validateCreateItem = async (req, res, next) => {
    console.log(req.body)

    const validateItemSchema = joi.object({
        name: joi.string()
            .trim()
            .min(2)
            .max(100)
            .required()
            .messages({
                "string.base": "Item name must be a text",
                "string.empty": "Item name is required",
                "string.min": "Item name must be at least 2 characters long",
                "string.max": "Item name must not exceed 100 characters",
                "any.required": "Item name is required",
            }),
        category: joi.string()
            .trim()
            .lowercase()
            .valid(
                "snacks",
                "main course",
                "desserts",
                "pizza",
                "burgers",
                "sandwiches",
                "south indian",
                "north indian",
                "chinese",
                "fast food",
                "others"
            )
            .default("others")
            .messages({
                'any.only':
                    'category must be one of Snacks, Main Course, Desserts, Pizza, Burgers, Sandwiches, South Indian, North Indian, Chinese, Fast Food, Others',
                'string.base': 'category must be a text'
            }),

        foodType: joi.string()
            .valid("Veg", "Non-Veg")
            .required()
            .messages({
                "string.base": "Food type must be a text",
                "any.only": "Food type must be either Veg or Non-Veg",
                "any.required": "Food type is required",
            }),
        price: joi.number()
            .min(0)
            .required()
            .messages({
                "number.base": "Price must be a number",
                "number.min": "Price cannot be negative",
                "any.required": "Price is required",
            }),
        public_id: joi.string()
            .messages({
                "string.base": "Public Id must be a string",
                "any.required": "Public Id is required",
            })
    })

    const { error, value } = validateItemSchema.validate(req.body, {
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

}
const validateEditItem = async (req, res, next) => {
    console.log(req.body)

    const validateEditItemSchema = joi.object({
        name: joi.string()
            .trim()
            .min(2)
            .max(100)
            .messages({
                "string.base": "Item name must be a text",
                "string.min": "Item name must be at least 2 characters long",
                "string.max": "Item name must not exceed 100 characters",
            }),

        image: joi.string()
            .uri()
            .messages({
                "string.uri": "Image must be a valid URL",
            }),

        public_id: joi.string()
            .messages({
                "string.base": "Public Id must be a string",
                "any.required": "Public Id is required",
            }),

        category: joi.string()
            .trim()
            .lowercase()
            .valid(
                "snacks",
                "main course",
                "desserts",
                "pizza",
                "burgers",
                "sandwiches",
                "south indian",
                "north indian",
                "chinese",
                "fast food",
                "others"
            )
            .messages({
                "any.only": "Invalid category",
            }),

        foodType: joi.string()
            .valid("Veg", "Non-Veg")
            .messages({
                "any.only": "Food type must be either Veg or Non-Veg",
            }),

        price: joi.number()
            .min(0)
            .messages({
                "number.min": "Price cannot be negative",
            }),

    }).min(1); // atleast any one required

    const { error, value } = validateEditItemSchema.validate(req.body, {
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

}


module.exports = { validateCreateItem, validateEditItem }