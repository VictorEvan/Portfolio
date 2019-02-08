import express from 'express';

import serverRenderer from './middleware/renderer';

const PORT = 4200;
const path = require('path');

// initialize the app and create routes
const app = express();
const router = express.Router();

// root (/) will serve server rendered page
router.use('^/$', serverRenderer);

// other static resources should just be served as they are
router.use(express.static(
	path.resolve(__dirname, '..', 'build'),
	// maxAge for HTTP caching
	{ maxAge: '30d' }
));

// anything else will act as index
// react-router will handle routes
router.use('*', serverRenderer);

// tell the app to use above middleware
app.use(router);

// start app
app.listen(PORT, (err) => {
	if (err) {
		return console.error('error yo', err);
	}
	console.log(`listening on ${PORT}...`);
});