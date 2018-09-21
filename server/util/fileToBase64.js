const fs = require('fs');

module.exports = (filePath) => fs.readFileSync(filePath, 'base64');