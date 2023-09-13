// Import modules
const express = require('express');

// Import controllers
const usersController = require('../controllers/usersController');
const authController = require('../middlewares/auth');
const notesController = require('../controllers/notesController');
// Import files
const validator = require('../middlewares/validator');
// Router object
const router = express.Router();

/*
* Authentication routes
*/
// Register route
router.post('/register', validator('register'), usersController.register);
// Register route
router.post('/login', validator('login'), usersController.login);
// Dashboard
router.get('/dashboard', authController.jwtUserAuthValidate, notesController.dashboard);
// Create note
router.post('/note', authController.jwtUserAuthValidate,validator('notes'), notesController.create);
// Get all notes
router.get('/notes', authController.jwtUserAuthValidate,validator('pagination'), notesController.list);
// Get single note
router.get('/note/:id', authController.jwtUserAuthValidate, validator('moduleId'), notesController.get);
// Update note
router.patch('/note/:id', authController.jwtUserAuthValidate, validator('moduleId'), validator('updateNotes') , notesController.update);
// Delete note
router.delete('/note/:id', authController.jwtUserAuthValidate,validator('moduleId'),notesController.delete);

module.exports = router;
