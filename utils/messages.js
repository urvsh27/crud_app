const generalMessages = {
  dbConnectionSuccess : 'Postgresql connected successfully.',
  dbConnectionFail : 'Unable to connect to the database.',
  dbSyncSuccess : 'Database synced.',
  welcomeMessage : 'Welcome to the crud app',
  jwtTokenRequired : 'Authorization token required.',
  jwtTokenExpired : 'JWT token expired.',
  unableToVerifyJwtToken : 'Unable to verify jwt token.',
  queryNameNotDefined :'Query name not defined',
};

const userMessages = {
  userRegisterSuccess: 'User registered successfully.',
  userRegisterFail: 'User registration failed, please try again later.',
  userAlreadyExists: 'User already exists with this email address.',
  userNotFound : 'User not found with this email address.',
  userLoginSuccess : 'User login successfully.',
  userLoginFailure : 'User login failed, please check email and password.',
};

const notesMessages = {
  noteCreateFail: 'Unable to create a note.',
  noteCreateSuccess: 'Note created successfully.',
  notesListNotFound: 'Note list not found.',
  notesListFound : 'Note list not found successfully.',
  noteNotFound : 'Note not found, Please try again later.',
  noteFound: 'Note found successfully.',
  noteUpdateFail: 'Unable to update note, Please try again later.',
  noteUpdatedSuccess: 'Note updated successfully.',
  noteDeleteFail : 'Unable to delete a note',
  noteDeleteSuccess: 'Note deleted successfully.',
};


module.exports = {
  generalMessages,
  userMessages,
  notesMessages
};
