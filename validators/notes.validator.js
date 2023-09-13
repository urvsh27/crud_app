const Joi = require('joi');
const title =Joi.string().required().label('Title');
const text =Joi.string().required().label('Text');

const notesSchema = Joi.object({
    title,
    text,
});

module.exports = notesSchema;
