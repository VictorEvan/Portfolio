'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const SkillSchema = new Schema({
  type: { type: String, required: true },
  overview: { type: String, required: true },
  notable_source_code: {
    url: { type: String },
    url_description: { type: String },
    source_description: { type: String }
  },
  notable_technologies: { type: [ String ], default: undefined }
});

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [ String ], required: true },
  web_url: { type: String },
  github_repo_url: { type: String },
  skills: [ SkillSchema ]
});

module.exports = mongoose.model('Project', ProjectSchema);