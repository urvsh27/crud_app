const Joi = require('joi');
const id =Joi.string().regex(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/).required().label('Module Id');

const moduleIdSchema = Joi.object({
    id
});

module.exports = moduleIdSchema;
