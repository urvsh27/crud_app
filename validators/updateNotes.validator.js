const Joi = require('joi');
const title =Joi.string().disallow("''", '""').label('Title');
const text =Joi.string().disallow("''", '""').label('Text');

const updateNotesSchema = Joi.object({
    title,
    text,
});

module.exports = updateNotesSchema;
