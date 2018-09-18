'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const SkillSchema = new Schema({
  type: { type: String, required: true },
  overview: { type: String, required: true },
  notable_source_url: { type: String },
  
});

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  tags: { type: [ String ], required: true },
  web_url: { type: String },
  github_url: { type: String },
  skills: [ SkillSchema ]
});

module.exports = mongoose.model('Project', ProjectSchema);