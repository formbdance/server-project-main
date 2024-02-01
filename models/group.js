const mongoose = require('mongoose');
const groupSchema = new mongoose.Schema({
  name: String,
  status: String,
});


module.exports = {
    groupSchema,
};
