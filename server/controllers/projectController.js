const Project = require('../models/Project');
// const ProjectImageRepo = require('../models/ProjectImageRepo');

module.exports.get_projects = async (req, res, next) => {
  try {
    const allProjects = await Project.find().exec();
    res.json(allProjects);
  } catch(err) {
    next(err);
  }
};

module.exports.get_project_images = async (req, res, next) => {

};