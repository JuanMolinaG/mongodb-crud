const Joi = require('@hapi/joi');

// Register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).max(50).required(),
        email: Joi.string().min(6).max(50).required().email(),
        password: Joi.string().min(6).max(50).required(),
    });

    return schema.validate(data);
};

// Login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(50).required().email(),
        password: Joi.string().min(6).max(50).required(),
    });

    return schema.validate(data);
};

// Create post validation
const postValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(4).max(50).required(),
        description: Joi.string().min(10).max(1024).required(),
    });

    return schema.validate(data);
};

module.exports = { registerValidation, loginValidation, postValidation };
