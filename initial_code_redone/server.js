var http = require('http');
var url = require('url');

function start(route, handle) {

    function onRequest(request, response) {
        // We parse the path in the request
        var pathname = url.parse(request.url).pathname;
        console.log('Request received.');
        //We call the route method (passed as a parameter to the start function)
        route(handle, pathname, response, request);
    }

    // We create a server, and we pass the onRequest method.
    // The method passed as a parameter will be called everytime a request is sent to the server.
    
    // example : you want to access a specific page, " start "
    // you use the url http://localhost:8080/start
    // It calls the method onRequest
    // The adress is parsed into pathname, which gives us pathname = start
    // the route method is called
    http.createServer(onRequest).listen(8080);
    console.log("Server started.");
}

exports.start = start