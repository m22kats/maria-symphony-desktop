const mongoose = require('mongoose');

const entitySchema = new mongoose.Schema({
  _id: String,
  type: String,
  rhythmNote: String,
  organization: String,
  title: String,
  isActive: Boolean,
  createTime: Date,
  updateTime: Date,
  attributes: Object,
});

const Entity = mongoose.model('Entity', entitySchema);

module.exports = Entity;
