const Joi = require('joi')
const email = Joi.string().email().lowercase().required().label('Email');
const password = Joi.string().required().label('Password');
console.log(email);
const loginSchema = Joi.object({
    email,
    password
});

module.exports = loginSchema;
