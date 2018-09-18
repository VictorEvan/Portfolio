const Contact = require('../models/contact');

module.exports.contact_create = async (req, res, next) => {
  const contact = new Contact(req.body);

  try {
    const newContact = await contact.save();
    res.json(newContact);
  } catch(err) {
    next(err);
  }
};