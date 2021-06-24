const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create Schema and Model

const TaskSchema = new Schema({
  Description: String,
  Completed: Boolean
});


const Task = mongoose.model('task', TaskSchema);

module.exports = Task;