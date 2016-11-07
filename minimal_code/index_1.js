var http = require('http');
var url = require('url');
var querystring = require('querystring');

// We create a server
// Here, createServer use a Callback Function, which is a function
var server = http.createServer(function(request, response) {

    // We explicitly write the header
    response.writeHead(200, {"Content-type": "text/html"});

    // We parse the page called
    var page = url.parse(request.url).pathname;
    // We parse the arguments sent
    var params = querystring.parse(url.parse(request.url).query);

    // if the url is : localhost:8080/hello?name=[name]&surname=[surname]
    if(page == '/hello' && 'name' in params && 'surname' in params) {
        response.write('<p><h2>' + params['name'] + ' ' + params['surname'] + ', bienvenue sur la page d\'accueil.</h2></p>');
    }
    // else, if the url is localhost:8080/yo
    else if(page == '/yo') {
        response.write('<p><h1>Wesh</h1></p>');
    }
    // else, the page does not exists, we overwrite the header and send a 404 code (Not found).
    else {
        response.writeHead(404);
    }

    // We close the stream
    response.end();
});

// The server is listening
server.listen(8080);