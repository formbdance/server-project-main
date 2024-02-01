const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  host: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  groupId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'stoped',
  },
});

module.exports = {
  serverSchema,
};
