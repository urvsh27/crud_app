const Joi = require('joi');
const title =Joi.string().required().label('Title');
const text =Joi.string().required().label('Text');
const userId =Joi.string().regex(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/).required().label('User Id');

const notesSchema = Joi.object({
    title,
    text,
    userId
});

module.exports = notesSchema;
