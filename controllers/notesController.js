

// Import files
const { generalMessages } = require('../utils/messages');
const {
    successObjectResponse,
    errorObjectResponse,
  } = require('../utils/response');

// Import controllers
const globalController = require('./globalController');
  
  
  module.exports = {
  // Dashboard
  async dashboard(req, res) {
    let successObjectRes = successObjectResponse;
    let errorObjectRes = errorObjectResponse;
    try {
      successObjectRes.message = generalMessages.welcomeMessage;
      successObjectRes.data = {}
      res.status(201).send(successObjectRes);
    } catch (error) {
      errorObjectRes.message = error.message;
      res.status(400).send(errorObjectRes);
    }
  },
};
