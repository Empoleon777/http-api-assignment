const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': { 'text/html': htmlHandler.getIndex },
    '/style.css': { 'text/css': htmlHandler.getCSS },
    '/success': { 'application/json': jsonHandler.success, 'text/xml': xmlHandler.success },
    '/badRequest': { 'application/json': jsonHandler.badRequest, 'text/xml': xmlHandler.badRequest },
    '/unauthorized': { 'application/json': jsonHandler.unauthorized, 'text/xml': xmlHandler.unauthorized },
    '/forbidden': { 'application/json': jsonHandler.forbidden, 'text/xml': xmlHandler.forbidden },
    '/internal': { 'application/json': jsonHandler.internal, 'text/xml': xmlHandler.internal },
    '/notImplemented': { 'application/json': jsonHandler.notImplemented, 'text/xml': xmlHandler.notImplemented },
    notFound: { 'application/json': jsonHandler.notFound, 'text/xml': xmlHandler.notFound }
};

const onRequest = (request, response) => {
    const parsedURL = url.parse(request.url);
    const params = query.parse(parsedURL.query);

    if (urlStruct[parsedURL.pathname]) {
        urlStruct[parsedURL.pathname](request, response, params);
    } else {
        urlStruct.notFound(request, response, params);
    }
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});