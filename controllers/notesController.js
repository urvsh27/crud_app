// Import models
const notesModel = require('../models').notes;

// Import files
const { generalMessages, notesMessages } = require('../utils/messages');
const {
  successObjectResponse,
  errorObjectResponse,
  successArrayResponse,
  errorArrayResponse,
} = require('../utils/response');
const db = require('../models/index');
const Sequelize = require('sequelize');

// Import controllers
const globalController = require('./globalController');
const { IsNotNullOrEmpty, IsNullOrEmpty } = require('../utils/enum');

module.exports = {
  // Dashboard
  async dashboard(req, res) {
    let successObjectRes = successObjectResponse;
    let errorObjectRes = errorObjectResponse;
    try {
      successObjectRes.message = generalMessages.welcomeMessage;
      successObjectRes.data = {};
      res.status(201).send(successObjectRes);
    } catch (error) {
      errorObjectRes.message = error.message;
      res.status(400).send(errorObjectRes);
    }
  },

  // Create note
  async create(req, res) {
    let successObjectRes = successObjectResponse;
    let errorObjectRes = errorObjectResponse;
    try {
      let newNoteId = '';
      await db.sequelize.transaction(
        {
          deferrable: Sequelize.Deferrable.SET_DEFERRED,
        },
        async (t1) => {
          await notesModel
            .create(
              {
                title: req.body.title,
                text: req.body.text,
                userId: req.headers.loggedInUserId,
              },
              { transaction: t1 }
            )
            .then(async (newNoteDetails) => {
              if (IsNotNullOrEmpty(newNoteDetails.id)) {
                newNoteId = newNoteDetails.id;
              } else {
                throw new Error(notesMessages.noteCreateFail);
              }
            })
            .catch(async (error) => {
              let message = await globalController.getMessageFromErrorInstance(
                error
              );
              if (message) {
                throw new Error(message);
              } else {
                throw new Error(error.message);
              }
            });
        }
      );
      successObjectRes.message = notesMessages.noteCreateSuccess;
      successObjectRes.data = await globalController.getModuleDetails(
        notesModel,
        'findOne',
        { id: newNoteId },
        ['id', 'title', 'text'],
        true
      );
      res.status(201).send(successObjectRes);
    } catch (error) {
      errorObjectRes.message = error.message;
      res.status(400).send(errorObjectRes);
    }
  },

  // Get all notes
  async list(req, res) {
    let successArrayRes = successArrayResponse;
    let errorArrayRes = errorArrayResponse;
    try {
      const pageIndex = req.query.pageIndex ? req.query.pageIndex : 0;
      const limit = req.query.limit ? req.query.limit : 5;
      const offset = pageIndex * limit;
      const notesList = await globalController.getModuleDetails(
        notesModel,
        'findAll',
        { userId: req.headers.loggedInUserId },
        [['id', 'noteId'], 'title', 'text'],
        true,
        [],
        offset,
        limit
      );
      if (IsNullOrEmpty(notesList)) {
        throw new Error(notesMessages.notesListNotFound);
      } else {
        successArrayRes.message = notesMessages.notesListFound;
        successArrayRes.data = notesList;
      }
      res.status(201).send(successArrayRes);
    } catch (error) {
      errorArrayRes.message = error.message;
      res.status(400).send(errorArrayRes);
    }
  },

  // Get note
  async get(req, res) {
    let successObjectRes = successObjectResponse;
    let errorObjectRes = errorObjectResponse;
    try {
      const noteDetails = await globalController.getModuleDetails(
        notesModel,
        'findOne',
        { id: req.params.id, userId: req.headers.loggedInUserId },
        [['id', 'noteId'], 'title', 'text'],
        true
      );
      if (IsNullOrEmpty(noteDetails)) {
        throw new Error(notesMessages.noteNotFound);
      } else {
        successObjectRes.message = notesMessages.noteFound;
        successObjectRes.data = noteDetails;
      }
      res.status(201).send(successObjectRes);
    } catch (error) {
      errorObjectRes.message = error.message;
      res.status(400).send(errorObjectRes);
    }
  },

  // Update note
  async update(req, res) {
    let successObjectRes = successObjectResponse;
    let errorObjectRes = errorObjectResponse;
    try {
      const noteDetails = await globalController.getModuleDetails(
        notesModel,
        'findOne',
        { id: req.params.id, userId: req.headers.loggedInUserId },
        [['id', 'noteId'], 'title', 'text'],
        true
      );
      if (IsNullOrEmpty(noteDetails)) {
        throw new Error(notesMessages.noteNotFound);
      } else {
        await db.sequelize.transaction(
          {
            deferrable: Sequelize.Deferrable.SET_DEFERRED,
          },
          async (t1) => {
            await notesModel
            .update(
              req.body,
              {
                where: {
                  id: req.params.id,
                  userId: req.headers.loggedInUserId,
                },
              },
              { transaction : t1}
            )
            .catch(async (error) => {
              let message = await globalController.getMessageFromErrorInstance(
                error
              );
              if (message) {
                throw new Error(message);
              } else {
                throw new Error(error.message);
              }
            });
          });
      }
      successObjectRes.message = notesMessages.noteUpdatedSuccess;
      successObjectRes.data =  await globalController.getModuleDetails(
        notesModel,
        'findOne',
        { id: req.params.id,userId : req.headers.loggedInUserId },
        ['id', 'title', 'text'],
        true
      );
      res.status(201).send(successObjectRes);
    } catch (error) {
      errorObjectRes.message = error.message;
      res.status(400).send(errorObjectRes);
    }
  },

  // Delete note
  async delete(req, res) {
    let successObjectRes = successObjectResponse;
    let errorObjectRes = errorObjectResponse;
    try {
      const noteDetails = await globalController.getModuleDetails(
        notesModel,
        'findOne',
        { id: req.params.id, userId: req.headers.loggedInUserId },
        [['id', 'noteId'], 'title', 'text'],
        true
      );
      if (IsNullOrEmpty(noteDetails)) {
        throw new Error(notesMessages.noteNotFound);
      } else {
        await notesModel
          .destroy({
            where: {
              id: req.params.id,
              userId: req.headers.loggedInUserId,
            },
          })
          .then(() => {
            successObjectRes.message = notesMessages.noteDeleteSuccess;
            successObjectRes.data = {};
          })
          .catch(async (error) => {
            let message = await globalController.getMessageFromErrorInstance(
              error
            );
            if (message) {
              throw new Error(message);
            } else {
              throw new Error(error.message);
            }
          });
      }
      res.status(201).send(successObjectRes);
    } catch (error) {
      errorObjectRes.message = error.message;
      res.status(400).send(errorObjectRes);
    }
  },
};
