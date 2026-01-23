const joi = require('joi');

const validateRegistration = async (req, res, next) => {
    console.log(req.body)

    const validateUserSchema = joi.object({
        userName: joi.string().trim().required().messages({
            "string.empty": "User name can not be empty",
            "any.required": "User name is mandatory"
        }),
        phoneNo: joi.string().required().messages({
            "string.empty": "Phone number can not be empty",
            "string.base": "Phone number must be a 10-digit number",
            "any.required": "Phone number is required"
        }),
        email: joi.string().trim().email().required().messages({
            "string.empty": "email can not be empty",
            "string.email": "email should be valid",
            "any.required": "email is mandatory"
        }),
        password: joi.string().trim().required().messages({
            "string.empty": "password can not be empty",
            "any.required": "password is mandatory"
        }),
        confirmPassword: joi.string().trim().valid(joi.ref('password')).required().messages({
            "any.only": "Confirm password must match password",
            "any.required": "Confirm password is mandatory",
            "string.empty": "Confirm password cannot be empty"
        }),
        category: joi.string().trim().lowercase().valid("restaurant", "consumer", "deliveryagent", "admin").required().messages({
            'any.only': 'category must be either restaurant, consumer, delivery agent or admin',
            'any.required': 'category is mandatory',
            'string.empty': 'category can not be empty'
        }),
    })

    const { error, value } = validateUserSchema.validate(req.body, {
        abortEarly: false,
        allowUnknown: true
    });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(d => d.message).join(", ")
        });
    }


    const { ...sanitizeValue } = value;
    req.body = sanitizeValue;
    next();

}


const validateLoginBody = async (req, res, next) => {
    try {
        const validateLoginData = joi.object({
            email: joi.string().email().required().messages({
                "string.empty": "email can not be empty",
                "string.email": "email should be valid",
                "any.required": "email is mandatory"
            }),
            password: joi.string().required().messages({
                "string.empty": "password can not be empty",
                "any.required": "password is mandatory"
            }),
            phoneNo: joi.string().required().messages({
                "string.empty": "Phone number can not be empty",
                "string.base": "Phone number must be string",
                "any.required": "Phone number is required"
            })
        });

        const { error, value } = validateLoginData.validate(req.body, {
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

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in validating ",
            error: error.message
        })
    }
}


const validatingForgotPassword = async (req, res, next) => {

    try {
        const validatingEmail = joi.object({
            email: joi.string().email().required().messages({
                "string.empty": "email can not be empty",
                "string.email": "email should be valid",
                "any.required": "email is mandatory"
            }),
        })

        const { error, value } = validatingEmail.validate(req.body, {
            abortEarly: false,
            allowUnknown: true
        })
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details.map(d => d.message).join(", ")
            });
        }

        req.body = value;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in validating email",
            error: error.message
        })
    }
}

module.exports = { validateRegistration, validateLoginBody, validatingForgotPassword }




