//Import validators
const register = require('./register.validator');
const login = require('./login.validator');
const notes = require('./notes.validator');

module.exports = {
    register,
    login,
    notes
};