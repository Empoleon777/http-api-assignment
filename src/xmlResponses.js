const respondXML = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(object);
  response.end();
};

const success = (request, response) => {
  let responseXML = '<response>';
  responseXML += '<message>This is a successful response.</message>';
  responseXML += '</response>';

  respondXML(request, response, 200, responseXML);
};

const badRequest = (request, response, params) => {
  let responseXML = '<response>';

  if (!params.valid || params.valid !== 'true') {
    responseXML += '<message>Missing valid query parameter set to true.</message>';
    responseXML += '<id>Bad Request</id>';
    responseXML += '</response>';

    return respondXML(request, response, 400, responseXML);
  }

  responseXML += '<message>This request has the required parameters.</message>';
  responseXML += '</response>';

  return respondXML(request, response, 200, responseXML);
};

const unauthorized = (request, response, params) => {
  let responseXML = '<response>';

  if (!params.valid || params.valid !== 'true') {
    responseXML += '<message>Missing loggedIn query parameter set to yes.</message>';
    responseXML += '<id>Unauthorized</id>';
    responseXML += '</response>';

    return respondXML(request, response, 401, responseXML);
  }

  responseXML += '<message>You have successfully viewed the content.</message>';
  responseXML += '</response>';

  return respondXML(request, response, 200, responseXML);
};

const forbidden = (request, response) => {
  let responseXML = '<response>';
  responseXML += '<message>You do not have access to this content.</message>';
  responseXML += '<id>Forbidden</id>';
  responseXML += '</response>';

  return respondXML(request, response, 403, responseXML);
};

const internal = (request, response) => {
  let responseXML = '<response>';
  responseXML += '<message>Internal Server Error. Something went wrong.</message>';
  responseXML += '<id>Internal</id>';
  responseXML += '</response>';

  return respondXML(request, response, 500, responseXML);
};

const notImplemented = (request, response) => {
  let responseXML = '<response>';
  responseXML += '<message>A get request for this page has not been implemented yet. Check again later for updated content.</message>';
  responseXML += '<id>Not Implemented</id>';
  responseXML += '</response>';

  return respondXML(request, response, 501, responseXML);
};

const notFound = (request, response) => {
  let responseXML = '<response>';
  responseXML += '<message>The page you are looking for was not found.</message>';
  responseXML += '<id>Not Found</id>';
  responseXML += '</response>';

  respondXML(request, response, 404, responseXML);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
