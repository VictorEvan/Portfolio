import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';

// import our main App Component;
import App from '../../src/App';

const path = require("path");
const fs = require("fs");

export default (req, res, next) => {
	// point to html file created by create-react-app
	const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');
	fs.readFile(filePath, 'utf8', (err, htmlData) => {
		if (err) {
			console.err('err', err);
			return res.status(404).end();
		}

		const context = {};

		// render app as string
		const html = ReactDOMServer.renderToString(
			<StaticRouter location={req.baseUrl} context={context}>
				<App />
			</StaticRouter>
		);

		// inject the rendered app into html and send
		return res.send(
			htmlData.replace(
				'<div react-js="root"></div>',
				`<div react-js="root">${html}</div>`
			)
		);
	});
}