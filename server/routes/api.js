const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController');
const projectController = require('../controllers/projectController');

router.post('/contact', contactController.contact_create);

router.get('/projects', projectController.get_projects);

module.exports = router;