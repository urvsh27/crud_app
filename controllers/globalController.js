// Import models
const usersModel = require('../models').users;

// Import modules
const moment = require('moment');

//Import files
const Sequelize = require('sequelize');
const { IsNotNullOrEmpty, IsNullOrEmpty } = require('../utils/enum');
const { dateTimeMessages, generalMessages } = require('../utils/messages');

module.exports = {
  /*
   * modelInstance : modelName
   * query  : findOne,
   * whereCondition : object,
   * returningAttributes : array
   * raw : boolean
   * offset : number
   * limit : number
   * modelIncludeData : array
   */
  async getModuleDetails(
    modelInstance,
    queryName,
    whereCondition,
    returningAttributes,
    raw,
    modelIncludeData,
    offset,
    limit
  ) {
    try {
      let responseDetails = {};
      const availableQueryNames = [
        'findAll',
        'findByPk',
        'findOne',
        'findAndCountAll',
      ];
      if (IsNullOrEmpty(queryName)) {
        throw new Error(generalMessages.queryNameNotDefined);
      } else if (availableQueryNames.includes(queryName)) {
        if (queryName === 'findOne') {
          await modelInstance
            .findOne({
              attributes: returningAttributes,
              where: whereCondition,
              offset: offset,
              limit: limit,
              raw: raw,
              include: modelIncludeData,
            })
            .then((queryResult) => {
              if (IsNotNullOrEmpty(queryResult)) {
                responseDetails = queryResult;
              }
            })
            .catch((error) => {
              throw new Error(error.message);
            });
        } else if (queryName === 'findAll') {
          await modelInstance
            .findAll({
              attributes: returningAttributes,
              where: whereCondition,
              offset: offset,
              limit: limit,
              raw: raw,
              include: modelIncludeData,
            })
            .then((queryResult) => {
              if (IsNotNullOrEmpty(queryResult)) {
                responseDetails = queryResult;
              }
            })
            .catch((error) => {
              throw new Error(error.message);
            });
        }
      } else {
        throw new Error(`${queryName} method is not available.`);
      }
      return responseDetails;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /*
  errors= [
    ValidationErrorItem {
      message: 'email must be unique',
      type: 'unique violation',
      path: 'email',
      value: 'urvish@gmail.com',
      origin: 'DB',
      instance: [users],
      validatorKey: 'not_unique',
      validatorName: null,
      validatorArgs: []
    }
  ],
  */

  /*
   * Instants Models error handler
   */
  async getMessageFromErrorInstance(error) {
    try {
      let message = '';
      if (error instanceof Sequelize.ForeignKeyConstraintError) {
        (message = 'Foreign key constraint error'), error.message;
      } else if (error instanceof Sequelize.ValidationError) {
        let validationErrorArray = error.errors;
        if (validationErrorArray.length > 0) {
          for (let i = 0; i < validationErrorArray.length; i++) {
            if (message != '') {
              message += ', ' + validationErrorArray[i].message;
            } else {
              message += validationErrorArray[i].message;
            }
          }
        }
      } else {
        message = error.message;
      }
      return message;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
