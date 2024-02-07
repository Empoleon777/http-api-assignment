const respondJSON = (request, response, status, object) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(object));
    response.end();
};

const success = (request, response) => {
    const responseJSON = {
        message: 'This is a successful response.'
    };

    console.log(responseJSON.stringify);
    respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, params) => {
    const responseJSON = {
        message: 'This request has the required parameters.'
    };

    if (!params.valid || params.valid !== 'true') {
        responseJSON.message = 'Missing valid query parameter set to true.';
        responseJSON.id = 'Bad Request';

        console.log(responseJSON.stringify);
        return respondJSON(request, response, 400, responseJSON);
    }

    console.log(responseJSON.stringify);
    return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, params) => {
    const responseJSON = {
        message: 'You have successfully viewed the content.'
    };

    if (!params.valid || params.valid !== 'true') {
        responseJSON.message = 'Missing loggedIn query parameter set to true.';
        responseJSON.id = 'Unauthorized';

        console.log(responseJSON.stringify);
        return respondJSON(request, response, 401, responseJSON);
    }

    console.log(responseJSON.stringify);
    return respondJSON(request, response, 200, responseJSON);
}

const forbidden = (request, response) => {
    const responseJSON = {
        message: 'You do not have access to this content.',
        id: 'Forbidden',
    };

    console.log(responseJSON.stringify);
    return respondJSON(request, response, 403, responseJSON);
}

const internal = (request, response) => {
    const responseJSON = {
        message: 'Internal Server Error. Something went wrong.',
        id: 'Internal',
    };

    console.log(responseJSON.stringify);
    return respondJSON(request, response, 500, responseJSON);
}

const notImplemented = (request, response) => {
    const responseJSON = {
        message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
        id: 'Not Implemented',
    };

    console.log(responseJSON.stringify);
    return respondJSON(request, response, 501, responseJSON);
}

const notFound = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'Not Found',
    };

    console.log(responseJSON.stringify);
    respondJSON(request, response, 404, responseJSON);
};

module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplemented,
    notFound
};  