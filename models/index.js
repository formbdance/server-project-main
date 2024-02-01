const mongoose = require('mongoose');
const config = require('config');
mongoose.Promise = Promise;

const settingsConnection = mongoose.createConnection(config.get('mongodb'));

const {serverSchema} = require('./server');
const {userActionSchema} = require('./user-action')
const {taskSchema} = require('./task')
const {groupSchema} = require('./group')

const Server = settingsConnection.model('servers', serverSchema);
const UserAction = settingsConnection.model('useractions', userActionSchema);
const Task = settingsConnection.model('tasks', taskSchema);
const Group = settingsConnection.model('groups', groupSchema);


module.exports = {
  Server,
  UserAction,
  Task,
  Group,
};
