//Import validators
const register = require('./register.validator');
const login = require('./login.validator');
const notes = require('./notes.validator');
const pagination = require('./pagination.validator');
const moduleId = require('./moduleId.validator');
const updateNotes = require('./updateNotes.validator');

module.exports = {
  register,
  login,
  notes,
  pagination,
  moduleId,
  updateNotes,
};
