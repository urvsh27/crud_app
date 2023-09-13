const Joi = require('joi');
const pageIndex =Joi.number().label('Page index');
const limit = Joi.number().label('Limit');

const paginationSchema = Joi.object({
    pageIndex,
    limit,
});

module.exports = paginationSchema;
