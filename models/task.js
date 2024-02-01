const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  date: String,
  name: String,
  serverId: String,
  completeDuration: String,
  isComplete: Boolean,
});


module.exports = {
    taskSchema,
};
